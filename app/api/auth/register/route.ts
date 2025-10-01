import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

const pathOrUrl = z.union([
  z.string().url("Invalid URL"),
  z.string().regex(/^\/[^\s]+$/, "Use a path like /artisans/luna-pottery.jpg"),
  z.literal(""), // allow empty from client, we'll turn into null
]);

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
  displayName: z.string().min(2, "Display name is required"),
  studioName: z.string().optional(),
  bio: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  avatarUrl: pathOrUrl.optional(),
  coverUrl: pathOrUrl.optional(),
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.parse(body);

    // Early email uniqueness check
    const existing = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (existing) {
      return NextResponse.json(
        { errors: { email: ["Email already in use."] } },
        { status: 422 }
      );
    }

    const passwordHash = await bcrypt.hash(parsed.password, 10);

    // Unique slug based on displayName
    let base = slugify(parsed.displayName) || "artisan";
    let slug = base, i = 1;
    while (await prisma.artisanProfile.findUnique({ where: { slug } })) {
      slug = `${base}-${i++}`;
    }

    // Normalize empty strings -> null
    const avatarUrl = parsed.avatarUrl && parsed.avatarUrl.length ? parsed.avatarUrl : null;
    const coverUrl  = parsed.coverUrl  && parsed.coverUrl.length  ? parsed.coverUrl  : null;

    // Create user + artisan profile
    const user = await prisma.user.create({
      data: {
        email: parsed.email,
        name: parsed.name || parsed.displayName,
        password: passwordHash,
        role: "ARTISAN",
        artisan: {
          create: {
            displayName: parsed.displayName,
            studioName: parsed.studioName || "",
            bio: parsed.bio || "",
            city: parsed.city || "",
            country: parsed.country || "",
            avatarUrl,  // nullable in schema
            coverUrl,   // nullable in schema
            slug,
          },
        },
      },
      include: { artisan: true },
    });

    return NextResponse.json(
      { ok: true, slug: user.artisan?.slug },
      { status: 201 }
    );
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      const flat = e.flatten();
      return NextResponse.json(
        { errors: { ...flat.fieldErrors, form: flat.formErrors } },
        { status: 422 }
      );
    }

    // Handle Prisma unique constraint on email safely
    if (e?.code === "P2002" && Array.isArray(e?.meta?.target) && e.meta.target.includes("email")) {
      return NextResponse.json({ errors: { email: ["Email already in use."] } }, { status: 422 });
    }

    return NextResponse.json({ error: e?.message ?? "Invalid request" }, { status: 400 });
  }
}