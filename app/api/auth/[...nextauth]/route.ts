import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: creds.email },
          include: { artisan: true },
        });
        if (!user) return null;
        const ok = await bcrypt.compare(creds.password, user.password);
        if (!ok) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? user.artisan?.displayName ?? "Artisan",
          artisanSlug: user.artisan?.slug,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = (user as any).id;
        token.artisanSlug = (user as any).artisanSlug;
      }
      return token;
    },
    async session({ session, token }) {
      session.userId = token.userId as string;
      session.artisanSlug = token.artisanSlug as string;
      if (session.user) session.user.artisanSlug = token.artisanSlug as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };