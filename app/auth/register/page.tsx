"use client";
import { useState } from "react";
import { uploadImage } from "@/lib/uploadToCloudinary";
import { toSlug } from "@/lib/slug";

export default function RegisterArtisanForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
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

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setOkMsg("");

    const fd = new FormData(e.currentTarget);
    const displayName = String(fd.get("displayName") || "");
    const slug = toSlug(displayName || String(fd.get("studioName") || "") || crypto.randomUUID());

    let avatarUrl: string | null = null;
    let coverUrl: string | null = null;
    if (avatarFile) avatarUrl = await uploadImage(avatarFile, `handcrafted-haven/artisans/${slug}`);
    if (coverFile)  coverUrl  = await uploadImage(coverFile,  `handcrafted-haven/artisans/${slug}`);

    const payload = {
      email: String(fd.get("email") || ""),
      password: String(fd.get("password") || ""),
      displayName,
      name: String(fd.get("name") || ""),
      studioName: String(fd.get("studioName") || ""),
      bio: String(fd.get("bio") || ""),
      city: String(fd.get("city") || ""),
      country: String(fd.get("country") || ""),
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
    setLoading(false);
  }

  function Err({ field }: { field: string }) {
    if (!errors?.[field]?.length) return null;
    return <p className="text-red-600 text-sm mt-1">{errors[field][0]}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-semibold">Create account</h1>

      {/* REQUIRED */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label>Email</label>
          <input name="email" type="email" required className="w-full border p-2" />
          <Err field="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" required minLength={8} className="w-full border p-2" />
          <Err field="password" />
        </div>
      </div>

      <div>
        <label>Display Name</label>
        <input name="displayName" required className="w-full border p-2" />
        <Err field="displayName" />
      </div>

      {/* OPTIONAL FIELDS */}
      <input name="studioName" placeholder="Studio Name" className="w-full border p-2" />
      <input name="name" placeholder="Your Name (optional)" className="w-full border p-2" />
      <textarea name="bio" placeholder="Short Bio" rows={4} className="w-full border p-2" />
      <input name="city" placeholder="City" className="w-full border p-2" />
      <input name="country" placeholder="Country" className="w-full border p-2" />

      {/* avatar */}
      <div>
        <label>Avatar</label>
        <input type="file" accept="image/*" onChange={e => handleAvatarChange(e.target.files?.[0] ?? null)} />
        {previewAvatar && <img src={previewAvatar} alt="Preview" className="h-24 w-24 rounded-full mt-2" />}
      </div>

      {/* cover */}
      <div>
        <label>Cover</label>
        <input type="file" accept="image/*" onChange={e => handleCoverChange(e.target.files?.[0] ?? null)} />
        {previewCover && <img src={previewCover} alt="Preview" className="h-24 w-full mt-2" />}
      </div>

      {errors?.form?.length ? <p className="text-red-600">{errors.form[0]}</p> : null}
      {okMsg ? <p className="text-green-600">{okMsg}</p> : null}

      <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white rounded">
        {loading ? "Creating…" : "Create account"}
      </button>
    </form>
  );
}