import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { rating } = await req.json();
    const r = Number(rating);
    if (!Number.isInteger(r) || r < 1 || r > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 });
    }

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        ratingCount: { increment: 1 },
        ratingSum: { increment: r },
      },
      select: { ratingCount: true, ratingSum: true },
    });

    const average = updated.ratingCount
      ? updated.ratingSum / updated.ratingCount
      : 0;

    return NextResponse.json({
      ratingCount: updated.ratingCount,
      ratingSum: updated.ratingSum,
      average,
    });
  } catch (e) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}