import type { Metadata } from "next";
import "../styles/globals.css";

import Providers from "./providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Marketplace for artisans and crafters",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <Providers>
          <div className="flex flex-col min-h-screen mx-auto max-w-6xl px-4">
            <Navbar />
            <main className="flex-1 py-6">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}