import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/** List products belonging to a specific artisan slug */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const artisan = await prisma.user.findUnique({
    where: { studioSlug: slug },
    select: { id: true },
  });

  if (!artisan) return NextResponse.json([]);

  const items = await prisma.product.findMany({
    where: { artisanId: artisan.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(items);
}