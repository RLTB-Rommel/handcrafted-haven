import { prisma } from "@/lib/prisma";
import StarRating from "@/app/components/StarRating";
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { ArtisanProfile: { select: { slug: true, displayName: true } } },
  });

  return (
    <main className="mx-auto max-w-7xl p-6">
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
        <p className="text-slate-600">
          Curated handmade items from our artisans.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="border rounded p-3">
            <a href={`/products/${p.id}`} className="block">
              <img
                src={p.imageUrl || "/placeholder.jpg"}
                alt={p.name}
                className="w-full h-56 object-cover rounded"
              />
              <div className="mt-2 font-semibold">{p.name}</div>
            </a>

            <div className="text-slate-600">
              ₱{(p.priceCents / 100).toFixed(2)}
            </div>
            {p.ArtisanProfile && (
              <div className="text-slate-500 text-sm">
                by {p.ArtisanProfile.displayName}
              </div>
            )}

            <StarRating
              productId={p.id}
              ratingCount={p.ratingCount}
              ratingSum={p.ratingSum}
            />
          </div>
        ))}

        {products.length === 0 && (
          <p className="text-slate-500">No products yet.</p>
        )}
      </div>

    </main>
  );
}