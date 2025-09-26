export type Artisan = {
  id: string;
  name: string;
  bio: string;
  image: string;
  productIds: string[];
};

export const artisans: Artisan[] = [
  {
    id: "luna",
    name: "Luna Pottery",
    bio: "Hand-thrown ceramics inspired by nature.",
    image: "/artisans/luna-pottery.jpg",
    productIds: ["cer-001"],
  },
  {
    id: "cedar",
    name: "Cedar & Grain",
    bio: "Woodcrafts made from reclaimed timber.",
    image: "/artisans/cedar.jpg",
    productIds: ["wood-002"],
  },
  {
    id: "aurora",
    name: "Aurora Gems",
    bio: "Handcrafted earrings and necklaces with a modern twist.",
    image: "/artisans/aurora-gems.jpg",
    productIds: ["jwl-003"],
  },
  {
    id: "willow",
    name: "Willow Weaves",
    bio: "Handwoven rugs and runners inspired by traditional patterns.",
    image: "/artisans/willow-weaves.jpg",
    productIds: ["txt-004"],
  },
  {
    id: "ironwood",
    name: "Ironwood Leather",
    bio: "Bags, wallets, and belts made from sustainably sourced leather.",
    image: "/artisans/ironwood-leather.jpg",
    productIds: ["lth-005"],
  },
  {
    id: "celeste",
    name: "Celeste Glass Studio",
    bio: "Colorful stained-glass décor for modern homes.",
    image: "/artisans/celeste-glass.jpg",
    productIds: ["gls-006"],
  },
  {
    id: "meadow",
    name: "Meadow Sketches",
    bio: "Nature-inspired watercolor and ink illustrations.",
    image: "/artisans/meadow-sketches.jpg",
    productIds: ["art-007"],
  },

  {
  id: "harbor",
  name: "Harbor Candle Co.",
  bio: "Hand-poured soy candles with natural scents inspired by the sea.",
  image: "/artisans/harbor-candle.jpg",
  productIds: ["cnd-008"],
},
{
  id: "summit",
  name: "Summit Forge",
  bio: "Functional and decorative ironwork, forged by hand.",
  image: "/artisans/summit-forge.jpg",
  productIds: ["mtl-009"],
},
];