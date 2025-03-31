"use client";

import Header from "./components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black text-white pt-24">
      <Header />
      
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-5xl mx-auto px-6">
        <h1 className="text-6xl font-bold mb-8">Buy anything with your AI agent</h1>
        <div className="w-full max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Type here"
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/20 text-lg"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
              <button className="text-white/50">📎</button>
              <button className="text-white/50">↑</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
