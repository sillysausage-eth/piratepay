// @ts-check
"use client";

import { useReadContract, useActiveAccount } from "thirdweb/react";
import { getContract } from "thirdweb";
import { base } from "thirdweb/chains";
import { client } from "../client";

// USDC contract on Base
const contract = getContract({
  address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  chain: base,
  client,
});

export default function Balance() {
  const account = useActiveAccount();

  const { data: balance, isLoading } = useReadContract({
    contract,
    method: "function balanceOf(address owner) view returns (uint256)",
    params: [account?.address || "0x0"],
  });

  if (!account?.address) return null;

  return (
    <div className="text-white">
      {isLoading ? (
        "Loading..."
      ) : (
        `USDC: ${balance ? (Number(balance) / 1e6).toFixed(2) : "0.00"}`
      )}
    </div>
  );
} 