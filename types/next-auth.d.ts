import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    userId?: string;
    artisanSlug?: string;
    user?: DefaultSession["user"] & { artisanSlug?: string };
  }

  interface JWT {
    userId?: string;
    artisanSlug?: string;
  }


  interface JWT {
    userId?: string;
    artisanSlug?: string;
  }

  interface User {
    artisanSlug?: string;
  }
}