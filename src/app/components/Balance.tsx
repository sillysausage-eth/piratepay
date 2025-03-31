// @ts-check
"use client";

import { useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb/contract";
import { client, USDC_CONTRACT, defaultChain } from "../client";
import { balanceOf } from "thirdweb/extensions/erc20";

export default function Balance() {
  const account = useActiveAccount();
  
  const contract = getContract({
    client,
    address: USDC_CONTRACT,
    chain: defaultChain,
  });

  const { data: balance, isLoading } = useReadContract(balanceOf, {
    contract,
    owner: account?.address || "0x0",
  });

  if (!account?.address) return null;
  if (isLoading) return <div className="text-white/50">Loading...</div>;

  // USDC has 6 decimals
  const usdBalance = balance ? Number(balance) / 1_000_000 : 0;
  
  return (
    <div className="text-white">
      ${usdBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </div>
  );
} 