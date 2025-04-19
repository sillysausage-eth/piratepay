// Navigation component for the dashboard
// Created: 2024-03-19

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";

const navigationItems = [
  { name: "Dashboard", path: "/dashboard", icon: "📊" },
  { name: "Transactions", path: "/transactions", icon: "📝" },
  { name: "Settings", path: "/settings", icon: "⚙️" },
];

export default function Navigation() {
  const pathname = usePathname();
  const account = useActiveAccount();
  const truncatedAddress = account?.address 
    ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
    : "";

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-[#050206] p-6 flex flex-col">
      {/* Logo Section */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold">PiratePay</h1>
        <p className="text-sm text-white/50 mt-2">{truncatedAddress}</p>
      </div>

      {/* Navigation Links */}
      <div className="space-y-2">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.path
                ? "bg-[#E233FF] text-white"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="mt-auto">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="text-sm text-white/50 mb-2">Need help?</div>
          <Link
            href="/support"
            className="text-[#E233FF] hover:text-[#E233FF]/80 text-sm"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </nav>
  );
} 