"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            Handcrafted Haven
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-6 text-sm">
          <Link href="/products" className="text-slate-700 hover:text-slate-900">
            Explore
          </Link>
          <Link href="/artisans" className="text-slate-700 hover:text-slate-900">
            Artisans
          </Link>
          <Link href="/auth/login" className="btn-ghost">Sign in</Link>
          <Link href="/auth/register" className="btn-primary">Create account</Link>
        </div>
      </nav>
    </header>
  );
}