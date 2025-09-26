import { artisans } from "../../lib/artisans";
import { products } from "../../lib/products";

export default function ArtisansIndex() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Artisans</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artisans.map((a) => (
          <a
            key={a.id}
            href={`/artisans/${a.id}`}
            className="block rounded-xl border border-slate-200 p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            <img
              src={a.image}
              alt={a.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="mt-3 text-lg font-semibold">{a.name}</h2>
            <p className="text-sm text-slate-600">{a.bio}</p>
          </a>
        ))}
      </div>
    </div>
  );
}