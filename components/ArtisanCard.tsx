import Image from "next/image";

type Props = {
  name: string;
  bio: string;
  image: string;
};

export default function ArtisanCard({ name, bio, image }: Props) {
  return (
    <article className="card group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-slate-900 group-hover:underline">
          {name}
        </h3>
        <p className="mt-1 text-sm text-slate-600">{bio}</p>
      </div>
    </article>
  );
}