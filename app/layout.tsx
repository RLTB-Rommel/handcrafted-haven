export const metadata = {
title: "Handcrafted Haven",
description: "Marketplace for artisans and crafters",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body className="min-h-screen antialiased text-slate-900 bg-slate-50">
<div className="mx-auto max-w-6xl px-4">
{/* @ts-expect-error Server Component */}
<Header />
<main className="py-6">{children}</main>
<Footer />
</div>
</body>
</html>
);
}


function Header() {
return (
<header className="py-4 flex items-center justify-between">
<a href="/" className="font-semibold">Handcrafted Haven</a>
<nav className="flex gap-4 text-sm">
<a href="/artisans/demo-maker">Artisans</a>
<a href="/products/1">Products</a>
</nav>
</header>
);
}


function Footer() {
return (
<footer className="py-8 text-sm text-slate-600 border-t mt-12">
© {new Date().getFullYear()} Handcrafted Haven
</footer>
);
}