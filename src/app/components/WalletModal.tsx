// @ts-check
"use client";

import { useActiveAccount } from "thirdweb/react";
import { PayEmbed } from "thirdweb/react";
import { client, defaultChain } from "../client";
import Balance from "./Balance";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletModal({ isOpen, onClose }: WalletModalProps) {
  const account = useActiveAccount();
  const truncatedAddress = account?.address 
    ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
    : "";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-96 h-full bg-black text-white p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Your Balance</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Balance Display */}
          <div className="bg-white/5 p-6 rounded-lg text-center">
            <div className="text-sm text-white/50 mb-2">Available Balance</div>
            <div className="text-3xl font-bold">
              <Balance />
            </div>
          </div>

          {/* Wallet Address */}
          <div className="bg-white/5 p-4 rounded-lg">
            <div className="text-sm text-white/50 mb-1">Wallet Address</div>
            <div className="flex items-center gap-2">
              <div className="font-mono">{truncatedAddress}</div>
              <button
                onClick={() => navigator.clipboard.writeText(account?.address || "")}
                className="text-xs text-white/50 hover:text-white"
              >
                Copy
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg"
              onClick={() => {
                // Add funds action will be handled by PayEmbed below
              }}
            >
              <span>+</span>
              Add Funds
            </button>
            <button
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg"
              onClick={() => {
                // Handle withdraw
              }}
            >
              <span>↓</span>
              Withdraw
            </button>
          </div>

          {/* PayEmbed for adding funds */}
          <div className="mt-4">
            <PayEmbed
              client={client}
              payOptions={{
                mode: "fund_wallet",
                buyWithCrypto: {
                  prefillSource: {
                    chain: defaultChain,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 