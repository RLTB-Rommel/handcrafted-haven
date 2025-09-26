export type Product = {
  id: string;          
  name: string;
  price: number;
  image: string;      
  description?: string;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Woven Abaca Tote",
    price: 1490,
    image: "/images/products/abaca-tote.jpg",
    description: "Handwoven tote from natural fibers.",
  },
  {
    id: "p2",
    name: "Carved Wooden Spoon",
    price: 290,
    image: "/images/products/wooden-spoon.jpg",
    description: "Food-safe hardwood, oil finished.",
  },
  {
    id: "p3",
    name: "Clay Trinket Bowl",
    price: 520,
    image: "/images/products/clay-bowl.jpg",
    description: "Small catch-all dish with matte glaze.",
  },
];