import Image from "next/image";
import { artisans } from "../../../lib/artisans";
import { products } from "../../../lib/data";

export default function ArtisanProfile({ params }: { params: { id: string } }) {
  const artisan = artisans.find((a) => a.id === params.id);
  if (!artisan) return <div>Artisan not found.</div>;

  // Cast p.id to string so it matches productIds: string[]
  const artisanProducts = products.filter((p) =>
    (artisan.productIds ?? []).includes(String(p.id))
  );

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-6">
        <Image
          src={artisan.image}
          alt={artisan.name}
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{artisan.name}</h1>
          <p className="text-slate-600">{artisan.bio}</p>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artisanProducts.map((p) => (
            <a
              key={p.id}
              href={`/products/${p.id}`}
              className="block rounded-xl border border-slate-200 p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <Image
                src={p.image}
                alt={p.name}
                width={600}
                height={400}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-3 font-medium">{p.name}</h3>
              <p className="text-sm text-slate-600">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(p.price)}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}