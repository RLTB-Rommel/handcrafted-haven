import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // 👈 Next 15: params is a Promise
    const { rating } = (await request.json()) as { rating: unknown };

    const r = Number(rating);
    if (!Number.isInteger(r) || r < 1 || r > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }

    const updated = await prisma.product.update({
      where: { id }, // cuid string in your schema
      data: {
        ratingCount: { increment: 1 },
        ratingSum: { increment: r },
      },
      select: { ratingCount: true, ratingSum: true },
    });

    // Refresh the /products list
    revalidatePath("/products");

    const average = updated.ratingCount
      ? updated.ratingSum / updated.ratingCount
      : 0;

    return NextResponse.json({
      ratingCount: updated.ratingCount,
      ratingSum: updated.ratingSum,
      average,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}