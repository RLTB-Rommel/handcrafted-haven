import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const items = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { ArtisanProfile: { select: { slug: true, displayName: true } } },
    });
    return NextResponse.json(items);
  } catch (e: any) {
    console.error("GET /api/products error:", e);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {

    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description, price, imageUrl, brand, category } = await req.json();

    if (!name || imageUrl == null || imageUrl === "" || price == null || price === "") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const priceNumber = typeof price === "number" ? price : parseFloat(String(price));
    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }
    const priceCents = Math.round(priceNumber * 100);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { artisan: true },
    });
    if (!user?.artisan) {
      return NextResponse.json({ error: "No artisan profile for this account" }, { status: 400 });
    }

    const created = await prisma.product.create({
      data: {
        name,
        description: description ?? null,
        priceCents,
        imageUrl,
        brand: brand ?? null,
        category: category ?? null,
        artisanId: user.artisan.id,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (e: any) {

    console.error("POST /api/products error:", e);
    return NextResponse.json({ error: e?.message ?? "Failed to create product" }, { status: 500 });
  }
}