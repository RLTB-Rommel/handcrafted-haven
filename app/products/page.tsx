import ProductCard from "../../components/ProductCard";
import { products } from "../../lib/data";

export const metadata = {
  title: "All Products • Handcrafted Haven",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
        <p className="text-slate-600">
          Curated handmade items from our artisans.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            price={p.price}
            image={p.image}
          />
        ))}
      </div>
    </div>
  );
}