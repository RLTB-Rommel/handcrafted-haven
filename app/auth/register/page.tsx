"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/uploadToCloudinary";
import { toSlug } from "@/lib/slug";

type FieldErrors = Record<string, string[]>;

export default function RegisterArtisanPage() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [okMsg, setOkMsg] = useState("");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [previewCover, setPreviewCover] = useState<string | null>(null);

  function handleAvatarChange(file: File | null) {
    setAvatarFile(file);
    setPreviewAvatar(file ? URL.createObjectURL(file) : null);
  }
  function handleCoverChange(file: File | null) {
    setCoverFile(file);
    setPreviewCover(file ? URL.createObjectURL(file) : null);
  }

  function Err({ field }: { field: string }) {
    if (!errors?.[field]?.length) return null;
    return <p className="text-red-600 text-sm mt-1">{errors[field][0]}</p>;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setOkMsg("");

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    const displayName = String(fd.get("displayName") || "");
    const studioName = String(fd.get("studioName") || "");
    const name = String(fd.get("name") || "");
    const bio = String(fd.get("bio") || "");
    const city = String(fd.get("city") || "");
    const country = String(fd.get("country") || "");

    const baseForSlug = displayName || studioName || crypto.randomUUID();
    const slug = toSlug(baseForSlug);

    // Upload images first -> get URLs for API
    let avatarUrl: string | null = null;
    let coverUrl: string | null = null;

    try {
      if (avatarFile) {
        avatarUrl = await uploadImage(avatarFile, `handcrafted-haven/artisans/${slug}`);
      }
      if (coverFile) {
        coverUrl = await uploadImage(coverFile, `handcrafted-haven/artisans/${slug}`);
      }

      const payload = {
        email,
        password,
        displayName,
        name,
        studioName,
        bio,
        city,
        country,
        avatarUrl: avatarUrl || "",
        coverUrl: coverUrl || "",
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data?.errors ?? { form: [data?.error || "Registration failed"] });
      } else {
        setOkMsg("Account created! Redirecting…");
        window.location.href = `/artisans/${data.slug}`;
      }
    } catch (err) {
      const msg = (err as { message?: string })?.message ?? "Something went wrong";
      setErrors({ form: [msg] });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Create account</h1>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* REQUIRED */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" type="email" required className="w-full border rounded p-2" />
            <Err field="email" />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input name="password" type="password" required minLength={8} className="w-full border rounded p-2" />
            <Err field="password" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Display Name</label>
          <input name="displayName" required className="w-full border rounded p-2" />
          <Err field="displayName" />
        </div>

        {/* OPTIONAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Studio Name</label>
            <input name="studioName" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Your Name (optional)</label>
            <input name="name" className="w-full border rounded p-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Short Bio</label>
          <textarea name="bio" rows={4} className="w-full border rounded p-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">City</label>
            <input name="city" className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <input name="country" className="w-full border rounded p-2" />
          </div>
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleAvatarChange(e.target.files?.[0] ?? null)}
          />
          {previewAvatar && (
            <div className="mt-2">
              <Image
                src={previewAvatar}
                alt="Avatar preview"
                width={96}
                height={96}
                className="h-24 w-24 object-cover rounded-full border"
                unoptimized
              />
            </div>
          )}
        </div>

        {/* Cover */}
        <div>
          <label className="block text-sm font-medium">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleCoverChange(e.target.files?.[0] ?? null)}
          />
          {previewCover && (
            <div className="mt-2">
              <Image
                src={previewCover}
                alt="Cover preview"
                width={1024}
                height={256}
                className="h-24 w-full object-cover border rounded"
                unoptimized
              />
            </div>
          )}
        </div>

        {errors?.form?.length ? <p className="text-red-600">{errors.form[0]}</p> : null}
        {okMsg ? <p className="text-green-600">{okMsg}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create account"}
        </button>
      </form>
    </div>
  );
}