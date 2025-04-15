"use client";

import Image from "next/image";
import { useConnect, useActiveAccount } from "thirdweb/react";
import { client, defaultChain } from "../../client";
import { inAppWallet } from "thirdweb/wallets";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const account = useActiveAccount();
  const [isLoading, setIsLoading] = useState(false);
  
  const { connect } = useConnect({
    client,
    accountAbstraction: {
      chain: defaultChain,
      sponsorGas: true,
    },
  });

  useEffect(() => {
    if (account?.address) {
      router.replace("/dashboard");
    }
  }, [account, router]);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      await connect(async () => {
        const wallet = inAppWallet({
          auth: {
            options: ["google"],
          },
        });
        
        await wallet.connect({
          client,
          chain: defaultChain,
          strategy: "google",
        });
        return wallet;
      });
    } catch (error) {
      console.error("Connection error:", error);
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <Image
          src="https://raw.githubusercontent.com/sillysausage-eth/piratepay-logo/refs/heads/main/White%20Logo%20%2B%20Icon.svg"
          alt="PiratePay Logo"
          width={300}
          height={80}
          className="mx-auto"
          priority
        />
        
        <h1 className="text-2xl font-light mt-8 mb-12">
          Buy anything with your AI agent
        </h1>

        <button
          onClick={handleConnect}
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? "Connecting..." : "Sign in with Google"}
        </button>

        <p className="text-sm text-gray-400 mt-8">
          By signing up, you agree to Piratepay&apos;s{" "}
          <a href="#" className="underline hover:text-white">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-white">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </main>
  );
} 