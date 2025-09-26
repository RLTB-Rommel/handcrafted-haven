import Image from "next/image";

type Props = {
  name: string;
  price: number;
  image: string; // e.g. "/products/mug.jpg" in /public/products
};

export default function ProductCard({ name, price, image }: Props) {
  return (
    <article className="group card overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          priority={false}
        />
        <span className="absolute left-3 top-3 badge">New</span>
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-slate-900 group-hover:underline">
          {name}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
    </article>
  );
}