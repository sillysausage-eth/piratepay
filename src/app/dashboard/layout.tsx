// Dashboard layout component with vertical navigation
// Created: 2024-03-19
// Updated: 2024-03-19 - Added Shop navigation and moved to dashboard group
// Updated: 2024-03-20 - Fixed navigation paths to use dashboard group
// Updated: 2024-03-20 - Fixed navigation paths to be relative to dashboard group

"use client";

import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#171717] flex">
      {/* Vertical Navigation */}
      <nav className="w-[300px] bg-[#0A0A0B] fixed h-full p-8 flex flex-col rounded-tr-2xl rounded-br-2xl">
        {/* Logo */}
        <div className="mb-12">
          <Image
            src="https://raw.githubusercontent.com/sillysausage-eth/piratepay-logo/main/White%20Logo%20%2B%20Icon.svg"
            alt="PiratePay"
            width={200}
            height={53}
            priority
          />
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <Link 
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/dashboard"
                ? "bg-[#E233FF] text-white"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Home
          </Link>
          <Link
            href="/dashboard/shop"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === "/dashboard/shop"
                ? "bg-[#E233FF] text-white"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Shop
          </Link>
        </div>

        {/* Wallet Connection - Bottom */}
        <div className="mt-auto">
          <ConnectButton 
            client={client}
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 ml-[300px]">
        {children}
      </div>
    </div>
  );
} 