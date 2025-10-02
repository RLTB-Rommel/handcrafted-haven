// app/artisans/page.tsx
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Disable caching for fresh lists in production; keep if you want live updates
export const revalidate = 0;
export const dynamic = "force-dynamic";

// Type for the exact shape we select from Prisma
type ArtisanCard = {
  id: string;
  slug: string;
  displayName: string | null;
  studioName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
};

export default async function ArtisansIndex() {
  const artisans: ArtisanCard[] = await prisma.artisanProfile.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      displayName: true,
      studioName: true,
      bio: true,
      avatarUrl: true,
      coverUrl: true,
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Artisans</h1>

      {artisans.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">
          No artisans yet. Be the first to register!
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artisans.map((a: ArtisanCard) => (
            <Link
              key={a.id}
              href={`/artisans/${a.slug}`}
              className="block rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Cover image */}
              <div className="relative h-40 w-full overflow-hidden rounded-t-xl">
                <Image
                  src={a.coverUrl || "/placeholder-cover.jpg"}
                  alt={
                    a.studioName ||
                    a.displayName ||
                    "Artisan cover"
                  }
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  priority={false}
                />
              </div>

              {/* Avatar + Name + Bio */}
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={a.avatarUrl || "/placeholder-avatar.png"}
                    alt={`${a.displayName ?? a.studioName ?? "Artisan"} avatar`}
                    width={48}
                    height={48}
                    className="rounded-full border object-cover"
                  />
                  <h2 className="text-lg font-semibold">
                    {a.studioName || a.displayName || "Untitled Studio"}
                  </h2>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                  {a.bio || "—"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}