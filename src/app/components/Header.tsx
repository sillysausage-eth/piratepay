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
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-xl">
      <div className="flex items-center">
        <Image
          src="https://raw.githubusercontent.com/sillysausage-eth/piratepay-logo/refs/heads/main/White%20Logo%20%2B%20Icon.svg"
          alt="PiratePay Logo"
          width={150}
          height={40}
          className="h-8 w-auto"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <Balance />
        <ConnectButton 
          client={client}
          theme="dark"
        />
      </div>

      {isModalOpen && (
        <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
} 