import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ slug: string }> }
) {
  const { slug } = await ctx.params;

  // Fetch this artisan's products via the relation
  const products = await prisma.product.findMany({
    where: { ArtisanProfile: { slug } },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      priceCents: true,
      imageUrl: true,
      brand: true,
      category: true,
      ratingCount: true,
      ratingSum: true,
      createdAt: true,
    },
  });

  return NextResponse.json(products);
}
