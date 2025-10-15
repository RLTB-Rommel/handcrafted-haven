"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  productId: string;
  ratingCount: number;
  ratingSum: number;
};

export default function StarRating({ productId, ratingCount, ratingSum }: Props) {
  const [count, setCount] = useState(ratingCount);
  const [sum, setSum] = useState(ratingSum);
  const [isSubmitting, setSubmitting] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const average = useMemo(() => (count ? sum / count : 0), [count, sum]);

  useEffect(() => {
    const seen = JSON.parse(localStorage.getItem("hh_rated") ?? "{}");
    setHasRated(Boolean(seen[productId]));
  }, [productId]);

  async function rate(r: number) {
    if (hasRated || isSubmitting) return;
    setSubmitting(true);

    // optimistic update
    const prev = { count, sum };
    setCount((c) => c + 1);
    setSum((s) => s + r);

    try {
      const res = await fetch(`/api/products/${productId}/rate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: r }),
      });
      if (!res.ok) throw new Error("rate failed");
      const data = await res.json();
      setCount(data.ratingCount);
      setSum(data.ratingSum);

      const seen = JSON.parse(localStorage.getItem("hh_rated") ?? "{}");
      seen[productId] = r;
      localStorage.setItem("hh_rated", JSON.stringify(seen));
      setHasRated(true);
    } catch {
      // revert on error
      setCount(prev.count);
      setSum(prev.sum);
      alert("Sorry, rating failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => {
          const filled = i <= Math.round(average);
          return (
            <button
              key={i}
              aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
              onClick={() => rate(i)}
              disabled={hasRated || isSubmitting}
              className={`text-xl ${filled ? "text-yellow-500" : "text-gray-300"} disabled:opacity-50`}
              title={hasRated ? "You already rated" : `Rate ${i}`}
            >
              ★
            </button>
          );
        })}
      </div>
      <span className="text-sm text-slate-600">
        {average.toFixed(1)} ({count})
      </span>
    </div>
  );
}