"use client";

import React from 'react'
import { SiGooglenews } from "react-icons/si";
import { useState } from 'react';
import Image from 'next/image';


const Home = () => {

  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); //Put true to show loading state
  const [error, setError] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news?keyword=${encodeURIComponent(keyword)}`);
      if (!res.ok) {
        throw new Error("Failed to fetch news");
      }
      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch news data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen min-w-screen bg-[#E6E8EA] flex flex-col justify-center items-center p-5 space-y-4">
      <div className="flex flex-row justify-center items-center space-x-2">
        <SiGooglenews className="text-black h-10 w-10"/>
        <div className="text-[#010419] text-2xl font-semibold tracking-tight">QuickNews.ai</div>
      </div>
      <div className="text-4xl font-extrabold text-[#4051B5] tracking-tight">Welcome to QuickNews</div>
      
      <div className="text-[#6D727C] text-center"
        >QuickNews lets you instantly analyze the latest news headlines for any topic.<br/>
          Enter a keyword to see top news summaries and their<br/>
          real-time AI-based sentiment insights.
      </div>

      <form className="flex flex-row items-center max-w-xl mx-auto space-x-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter keyword (e.g. AI)"
          required
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        />

        <button
          type="submit"
          className="text-white bg-[#4051B5] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
        >
          Search
        </button>
      </form>

            {/* {loading && <p className="text-orange-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-5xl flex flex-col md:flex-row md:space-x-2 space-y-4 px-2 items-stretch">
        {results.map((item, idx) => (
          <div key={idx} className="border rounded p-4 shadow-lg bg-white text-sm md:flex-1 md:h-70">
            <h2 className="text-[#4051B5] font-semibold text-lg">{item.headline}</h2>
            <p className="text-[#010419]">{item.summary}</p>
            <p className="mt-2 text-sm">
              <span className="text-[#6D727C] font-medium">Sentiment:</span>{" "}
              <span className="text-orange-500 capitalize">{item.sentiment}</span>
            </p>
          </div>
        ))}
      </div> */}

      {loading ? (
  <div className="w-full max-w-5xl flex flex-col md:flex-row md:space-x-2 space-y-4 px-2 items-stretch">
    {Array.from({ length: 3 }).map((_, idx) => (
      <div
        key={idx}
        className="border rounded p-4 shadow-lg bg-white text-sm md:flex-1 md:h-70 animate-pulse"
      >
        <div className="h-6 bg-gray-300 rounded mb-4"></div> {/* headline skeleton */}
        <div className="h-4 bg-gray-200 rounded mb-2"></div> {/* summary line 1 */}
        <div className="h-4 bg-gray-200 rounded mb-2"></div> {/* summary line 2 */}
        <div className="h-4 bg-gray-200 rounded w-1/2"></div> {/* sentiment */}
      </div>
    ))}
  </div>
) : (
  <div className="w-full max-w-5xl flex flex-col md:flex-row md:space-x-2 space-y-4 px-2 items-stretch">
    {results.map((item, idx) => (
      <div
        key={idx}
        className="border rounded p-4 shadow-lg bg-white text-sm md:flex-1 md:h-70"
      >
        <h2 className="text-[#4051B5] font-semibold text-lg">
          {item.headline}
        </h2>
        <p className="text-[#010419]">{item.summary}</p>
        <p className="mt-2 text-sm">
          <span className="text-[#6D727C] font-medium">Sentiment:</span>{" "}
          <span className="text-orange-500 capitalize">{item.sentiment}</span>
        </p>
      </div>
    ))}
  </div>
)}




    </main>
  )
}

export default Home