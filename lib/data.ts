export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
};

export const products: Product[] = [
  { id: "cer-001", name: "Stoneware Mug",          price: 19,  image: "/products/mug.jpg",      description: "Hand-thrown, food-safe glaze." },
  { id: "wood-002",name: "Walnut Board",           price: 29,  image: "/products/board.jpg",    description: "Reclaimed walnut, oil finished." },
  { id: "jwl-003", name: "Brass Earrings",         price: 55,  image: "/products/earrings.jpg", description: "Modern geometric brass earrings." },
  { id: "txt-004", name: "Cotton Runner",          price: 199, image: "/products/runner.jpg",   description: "Handwoven table runner." },
  { id: "lth-005", name: "Leather Wallet",         price: 79,  image: "/products/wallet.jpg",   description: "Full-grain leather, slim profile." },
  { id: "gls-006", name: "Stained Glass Sun Catcher", price: 45, image: "/products/suncatcher.jpg", description: "Vibrant glass, copper foil technique." },
  { id: "art-007", name: "Wildflower Print",       price: 25,  image: "/products/print.jpg",    description: "Watercolor & ink A4 art print." },
  { id: "cnd-008", name: "Sea Breeze Candle",      price: 22,  image: "/products/candle.jpg",   description: "Soy wax, cotton wick, ocean notes." },
  { id: "mtl-009", name: "Forged Hook Set",        price: 35,  image: "/products/hooks.jpg",    description: "Hand-forged iron utility hooks." },
];