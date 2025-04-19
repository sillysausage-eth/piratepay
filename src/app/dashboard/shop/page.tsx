"use client";

import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ShopPage() {
  const router = useRouter();
  const account = useActiveAccount();

  useEffect(() => {
    if (!account?.address) {
      router.replace("/login");
    }
  }, [account, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-12">
      {/* Main Heading */}
      <h1 className="text-[42px] text-white mb-12">What do you want to buy?</h1>

      {/* Search Input */}
      <div className="w-full max-w-2xl mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Type here"
            className="w-full bg-[#1A1A1A] text-white rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#E233FF] placeholder-white/50 text-lg border border-white/10"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3V21M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex gap-4">
        <button className="bg-[#E6E6E6] hover:bg-white transition-colors text-black px-8 py-4 rounded-2xl font-medium">
          Book your flights
        </button>
        <button className="bg-[#E6E6E6] hover:bg-white transition-colors text-black px-8 py-4 rounded-2xl font-medium">
          Buy a pizza
        </button>
        <button className="bg-[#E6E6E6] hover:bg-white transition-colors text-black px-8 py-4 rounded-2xl font-medium">
          Book your hotel
        </button>
      </div>

      {/* Helper Text */}
      <p className="text-white/70 text-center mt-12 max-w-2xl">
        Let your agent find the best flights for your trip, order pizzas for your house party, or buy anything you can think of
      </p>
    </div>
  );
} 