"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard/products/new"); // or wherever you want to redirect
    }
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input type="email" name="email" placeholder="Email" className="w-full border p-2 rounded" required />
        <input type="password" name="password" placeholder="Password" className="w-full border p-2 rounded" required />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}