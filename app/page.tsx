import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { products } from "../lib/data";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 ring-1 ring-inset ring-violet-200">
            Curated & Local • Sustainable
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Discover Unique, Handmade Pieces
          </h1>
          <p className="mt-3 text-slate-600">
            Support local artisans and find one-of-a-kind items crafted with care.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary">Browse products</Link>
            <Link href="/artisans" className="btn-ghost">Meet the artisans</Link>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="mt-10 sm:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
          {products.slice(0, 6).map((p) => (
            <ProductCard
              key={p.id}
              name={p.name}
              price={p.price}
              image={p.image}
            />
          ))}
        </div>
      </section>

      {/* Callout */}
      <section className="mt-14">
        <div className="card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Are you an artisan?</h3>
            <p className="text-slate-600">Open a shop and reach a community who loves handmade.</p>
          </div>
          <Link href="/onboarding" className="btn-primary">Start selling</Link>
        </div>
      </section>
    </div>
  );
}