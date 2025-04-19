"use client";

import { useConnect } from "thirdweb/react";
import { client } from "../client";
import { inAppWallet } from "thirdweb/wallets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleAuth } from "../actions";

export default function LoginPage() {
  const router = useRouter();
  const { connect } = useConnect({
    client,
  });

  const handleGoogleLogin = () => {
    connect(async () => {
      const wallet = inAppWallet();
      await wallet.connect({
        client,
        strategy: "google",
      });
      const account = await wallet.getAccount();
      if (!account) {
        throw new Error("Failed to get wallet account");
      }
      await handleAuth(account.address);
      router.push("/dashboard");
      return wallet;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#171717]">
      <div className="w-[720px] flex flex-col items-center space-y-16">
        {/* Logo */}
        <Image
          src="https://raw.githubusercontent.com/sillysausage-eth/piratepay-logo/refs/heads/main/White%20Logo%20%2B%20Icon.svg"
          alt="PiratePay Logo"
          width={520}
          height={139}
          className="w-[520px] h-auto"
          priority
        />

        {/* Tagline */}
        <h2 className="text-[42px] font-light text-white whitespace-nowrap">Buy anything with your AI agent</h2>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-[360px] hover:opacity-90 transition-opacity focus:outline-none"
        >
          <Image
            src="https://raw.githubusercontent.com/sillysausage-eth/piratepay-logo/main/UI%20Assets/continue%20with%20google.svg"
            alt="Continue with Google"
            width={360}
            height={54}
            priority
          />
        </button>

        {/* Terms */}
        <div className="text-center text-[14px] text-[#A1A1AA]">
          By signing up, you agree to Piratepay&apos;s{" "}
          <Link href="/terms" className="underline hover:text-white">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-white">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
} 