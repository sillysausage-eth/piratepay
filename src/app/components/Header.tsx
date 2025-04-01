// @ts-check
"use client";

import { useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { client, defaultChain } from "../client";
import { inAppWallet } from "thirdweb/wallets";
import Image from "next/image";
import WalletModal from "./WalletModal";
import Balance from "./Balance";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex items-center justify-between px-8 py-8">
          <div className="flex items-center">
            <Image
              src="https://raw.githubusercontent.com/sillysausage-eth/piratepay-logo/refs/heads/main/White%20Logo%20%2B%20Icon.svg"
              alt="PiratePay Logo"
              width={200}
              height={53}
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center gap-4">
            <Balance />
            <ConnectButton client={client} chain={defaultChain} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
} 