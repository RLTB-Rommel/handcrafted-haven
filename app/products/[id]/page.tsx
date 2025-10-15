import { prisma } from "@/lib/prisma";
import StarRating from "@/app/components/StarRating";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id }, // id is a String (cuid)
    include: {
      ArtisanProfile: { select: { slug: true, displayName: true } },
    },
  });

  if (!product) return notFound();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.imageUrl || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-96 object-cover rounded-2xl"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-slate-700 mb-4">
            ₱{(product.priceCents / 100).toFixed(2)}
          </div>

          {product.ArtisanProfile && (
            <div className="mb-4 text-slate-600">
              by{" "}
              <Link
                className="underline"
                href={`/artisans/${product.ArtisanProfile.slug}`}
              >
                {product.ArtisanProfile.displayName}
              </Link>
            </div>
          )}

          <StarRating
            productId={product.id}
            ratingCount={product.ratingCount}
            ratingSum={product.ratingSum}
          />

          {product.description && (
            <p className="mt-6 text-slate-700 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}