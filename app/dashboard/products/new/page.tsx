"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { uploadImage } from "@/lib/uploadToCloudinary";

export default function NewProductPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const priceStr = String(fd.get("price") || "").trim();
    const description = String(fd.get("description") || "").trim();

    // quick client validation
    if (!name) { setErr("Please enter a product name."); setLoading(false); return; }
    if (!priceStr || isNaN(Number(priceStr)) || Number(priceStr) < 0) {
      setErr("Please enter a valid price (e.g. 199 or 199.99).");
      setLoading(false);
      return;
    }
    if (!file) { setErr("Please choose an image."); setLoading(false); return; }

    try {
      // 1) Upload image first
      const imageUrl = await uploadImage(file, `handcrafted-haven/products/${name.toLowerCase()}`);

      // 2) Create product
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price: priceStr, description, imageUrl }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErr(data.error || "Failed to create product");
        setLoading(false);
        return;
      }

      // 3) Redirect: prefer artisan page if we have the slug
      const slug = (session as any)?.artisanSlug;
      router.push(slug ? `/artisans/${slug}` : "/products");
    } catch (e: any) {
      setErr(e?.message || "Something went wrong while uploading/creating.");
      setLoading(false);
    }
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add a product</h1>

      {err && <p className="mb-3 text-sm text-red-600">{err}</p>}

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product name"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="Price (PHP)"
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description (optional)"
          className="border p-2 w-full rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Create"}
        </button>
      </form>
    </main>
  );
}