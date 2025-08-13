"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  checkDailyUsageLimit,
  incrementUsageCount,
} from "@/components/UsageGuardRail";

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOverLimit, setIsOverLimit] = useState(false);

  useEffect(() => {
    const usageCheck = checkDailyUsageLimit(10);
    setIsOverLimit(!usageCheck.allowed);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    if (isOverLimit) {
      setError("You've reached your daily limit.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/news?keyword=${encodeURIComponent(
          keyword
        )}`
      );
      if (!res.ok) throw new Error("Failed to fetch news");

      const data = await res.json();
      setResults(data);
      incrementUsageCount();
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch news data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-dvh w-full flex flex-col items-center justify-center p-5 space-y-4 bg-bg text-text">
      <div className="flex flex-row items-center space-x-2">
        <Image src="/logo.png" alt="QuickNews Logo" width={40} height={40} />
        <div className="text-2xl font-bold tracking-tight">QuickNews.ai</div>
      </div>

      <div className="text-4xl font-extrabold text-accent text-center tracking-tight">
        Welcome to QuickNews
      </div>

      <div className="text-center">
        <p className="text-lightMuted dark:text-darkMuted">
          QuickNews lets you instantly analyze the latest news headlines for any
          topic
        </p>
        <p className="text-lightMuted dark:text-darkMuted">
          Enter a keyword to see top news summaries and their
        </p>
        <p className="text-lightMuted dark:text-darkMuted">
          real-time AI-based sentiment insights
        </p>
      </div>

      <form
        className="flex flex-row items-center max-w-xl mx-auto space-x-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter keyword (e.g. AI)"
          required
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 bg-card text-text border border-border text-sm rounded-lg
                     focus:ring-accent focus:border-accent p-2.5"
        />

        <button
          type="submit"
          disabled={isOverLimit}
          title={isOverLimit ? "Query limit reached for today" : ""}
          className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none transition-colors duration-300
            ${
              isOverLimit
                ? "bg-red-600 cursor-not-allowed hover:opacity-90"
                : "bg-accent hover:opacity-90 focus:ring-4"
            }`}
        >
          Search
        </button>
      </form>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {loading ? (
        <div className="w-full max-w-5xl flex flex-col md:flex-row md:space-x-2 space-y-4 px-2 items-stretch">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="border border-border rounded p-4 shadow-lg bg-card text-sm md:flex-1 md:h-70 animate-pulse"
            >
              <div className="h-6 bg-lightSkeleton1 dark:bg-darkSkeleton1 rounded mb-4"></div>
              <div className="h-4 bg-lightSkeleton2 dark:bg-darkSkeleton2 rounded mb-2"></div>
              <div className="h-4 bg-lightSkeleton2 dark:bg-darkSkeleton2 rounded mb-2"></div>
              <div className="h-4 bg-lightSkeleton2 dark:bg-darkSkeleton2 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-5xl flex flex-col md:flex-row md:space-x-2 space-y-4 px-2 items-stretch">
          {results.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between border border-border rounded p-4 shadow-lg bg-card text-sm md:flex-1 md:h-70"
            >
              <div>
                <h2 className="text-accent font-semibold text-lg line-clamp-3">
                  {item.headline}
                </h2>
                <p className="line-clamp-6">{item.summary}</p>
              </div>
              <div>
                <p className="mt-2 text-sm">
                  <span className="text-lightMuted dark:text-darkMuted font-medium">
                    Sentiment:
                  </span>{" "}
                  <span className="text-orange-500 capitalize">
                    {item.sentiment}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
