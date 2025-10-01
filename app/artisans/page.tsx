import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function ArtisansIndex() {
  const artisans = await prisma.artisanProfile.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, slug: true, displayName: true, studioName: true,
      bio: true, avatarUrl: true, coverUrl: true,
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Artisans</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artisans.map(a => (
          <Link key={a.id} href={`/artisans/${a.slug}`}
            className="block rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
            <div className="w-full h-40 overflow-hidden rounded-t-xl relative">
              <Image src={a.coverUrl || "/placeholder-cover.jpg"} alt={a.studioName || a.displayName} fill className="object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <Image src={a.avatarUrl || "/placeholder-avatar.png"} alt={`${a.displayName} avatar`} width={48} height={48} className="rounded-full border object-cover" />
                <h2 className="text-lg font-semibold">{a.studioName || a.displayName}</h2>
              </div>
              <p className="mt-2 text-sm text-slate-600 line-clamp-2">{a.bio || "—"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}