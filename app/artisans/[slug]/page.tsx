import { prisma } from "@/lib/prisma";
import Image from "next/image";

export const dynamic = "force-dynamic";

type Props = { params: { slug: string } };

export default async function ArtisanPage({ params }: Props) {
  const profile = await prisma.artisanProfile.findUnique({
    where: { slug: params.slug },
    include: {
      Product: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          imageUrl: true,
          priceCents: true,
        },
      },
    },
  });

  if (!profile) {
    return <main className="mx-auto max-w-5xl p-6">Artisan not found.</main>;
  }

  // safe fallbacks so UI still renders if fields are null
  const cover = profile.coverUrl ?? "/cover-placeholder.jpg";
  const avatar = profile.avatarUrl ?? "/avatar-placeholder.png";

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="mb-6 overflow-hidden rounded-2xl">

        {/*<img src={cover} alt="" className="h-60 w-full object-cover" />*/}
      <div className="relative w-full h-48 overflow-hidden rounded-2xl">
        <Image
          src={cover}
          alt={`${profile.displayName} cover`}
          fill
          className="object-cover"
          style={{ objectPosition: "50% 90%" }}
          sizes="100vw"
          priority
        />
      </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <img
          src={avatar}
          alt={profile.displayName}
          className="h-20 w-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{profile.displayName}</h1>
          <p className="text-slate-600">
            {[profile.city, profile.country].filter(Boolean).join(", ")}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">Products</h2>
      {profile.Product.length === 0 ? (
        <p className="text-slate-500">No products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.Product.map((p) => (
            <a key={p.id} href={`/products/${p.id}`} className="border rounded p-3 block">
              <img
                src={p.imageUrl || "/placeholder.jpg"}
                alt={p.name}
                className="w-full h-56 object-cover rounded"
              />
              <div className="mt-2 font-semibold">{p.name}</div>
              <div className="text-slate-600">₱{(p.priceCents / 100).toFixed(2)}</div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}