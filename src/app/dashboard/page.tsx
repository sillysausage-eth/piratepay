"use client";

import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../components/Header";
import Balance from "../components/Balance";

export default function DashboardPage() {
  const router = useRouter();
  const account = useActiveAccount();

  useEffect(() => {
    if (!account?.address) {
      router.replace("/login");
    }
  }, [account, router]);

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <Header />
      <div className="flex flex-col items-start justify-start max-w-7xl mx-auto w-full px-8 pt-32 pb-12 gap-16">
        {/* Balance Section */}
        <div className="w-full">
          <div className="p-[1px] rounded-3xl relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">
            <div className="bg-black p-12 rounded-3xl relative">
              <div className="space-y-8">
                <div className="space-y-1">
                  <div className="text-white/50">Total assets</div>
                  <Balance showLarge={true} />
                  <div className="text-emerald-500 text-sm font-medium">4.16% APY</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 flex items-center justify-center">💰</div>
                      <div className="text-white/70">Earned this month</div>
                    </div>
                    <div>$0.00</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 flex items-center justify-center">💸</div>
                      <div className="text-white/70">Saved this month</div>
                    </div>
                    <div>$0.00</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors">
                    Add money
                  </button>
                  <button className="bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agents Section */}
        <div className="w-full">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-semibold">Pirate Agents</h2>
              <p className="text-white/70 text-lg">
                Send your agent out on a mission.<br />
                Let it find the best flights for your next trip, order the pizzas for your birthday party, and much more!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="bg-white/5 hover:bg-white/10 transition-colors p-8 rounded-2xl text-left">
                <h3 className="text-xl font-medium mb-2">Book your flights</h3>
                <p className="text-white/50">Find and book the best flights for your next trip</p>
              </button>

              <button className="bg-white/5 hover:bg-white/10 transition-colors p-8 rounded-2xl text-left">
                <h3 className="text-xl font-medium mb-2">Book your hotel</h3>
                <p className="text-white/50">Find and book the perfect accommodation</p>
              </button>

              <button className="bg-white/5 hover:bg-white/10 transition-colors p-8 rounded-2xl text-left">
                <h3 className="text-xl font-medium mb-2">Buy a pizza</h3>
                <p className="text-white/50">Order pizza from your favorite local spots</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 