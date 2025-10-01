export async function uploadImage(file: File, folder: string) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloud) throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");
  if (!preset) throw new Error("Missing NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET");

  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", preset);
  fd.append("folder", folder);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, {
    method: "POST",
    body: fd,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || "Upload failed");
  return data.secure_url as string;
}