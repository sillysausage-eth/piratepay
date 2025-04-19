// @ts-check
"use client";

import { useReadContract, useActiveAccount } from "thirdweb/react";
import { getContract } from "thirdweb";
import { base } from "thirdweb/chains";
import { client } from "../client";
import { formatUnits } from "viem";

// USDC contract on Base
const contract = getContract({
  address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  chain: base,
  client,
});

interface BalanceProps {
  showLarge?: boolean;
  balance?: bigint;
  symbol?: string;
  decimals?: number;
}

export default function Balance({ showLarge = false, balance: propBalance, symbol = "USDC", decimals = 6 }: BalanceProps) {
  const account = useActiveAccount();

  const { data: balanceData, isLoading } = useReadContract({
    contract,
    method: "function balanceOf(address owner) view returns (uint256)",
    params: [account?.address || "0x0"],
  });

  const formattedBalance = () => {
    if (propBalance !== undefined) {
      const amount = Number(formatUnits(propBalance, decimals));
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    }

    if (isLoading) return "—";
    if (!balanceData) return "$0.00";
    const amount = Number(balanceData) / 1e6; // Convert from USDC decimals
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div>
      {isLoading && !propBalance ? (
        <div className={`animate-pulse bg-white/10 rounded ${
          showLarge ? 'h-16 w-64' : 'h-12 w-48'
        }`} />
      ) : (
        <div>
          {formattedBalance()}
        </div>
      )}
    </div>
  );
} 