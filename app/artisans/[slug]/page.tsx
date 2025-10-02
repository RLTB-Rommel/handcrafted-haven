import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type ArtisanDetailProps = {
  params: { slug: string };
};

export default async function ArtisanDetail({ params }: ArtisanDetailProps) {
  const artisan = await prisma.artisanProfile.findUnique({
    where: { slug: params.slug },
    select: {
      id: true,
      slug: true,
      displayName: true,
      studioName: true,
      bio: true,
      avatarUrl: true,
      coverUrl: true,
      city: true,
      country: true,
      createdAt: true,
    },
  });

  if (!artisan) return notFound();

  return (
    <div className="space-y-6">
      {/* Cover */}
      <div className="relative h-60 w-full overflow-hidden rounded-xl">
        <Image
          src={artisan.coverUrl || "/placeholder-cover.jpg"}
          alt={artisan.studioName || artisan.displayName || "Artisan cover"}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Avatar + name */}
      <div className="flex items-center gap-4">
        <Image
          src={artisan.avatarUrl || "/placeholder-avatar.png"}
          alt={`${artisan.displayName ?? "Artisan"} avatar`}
          width={80}
          height={80}
          className="rounded-full border object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">
            {artisan.studioName || artisan.displayName}
          </h1>
          <p className="text-slate-600">
            {artisan.city ? `${artisan.city}, ${artisan.country}` : ""}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h2 className="text-lg font-semibold">About</h2>
        <p className="mt-2 text-slate-700">{artisan.bio || "No bio yet."}</p>
      </div>
    </div>
  );
}
