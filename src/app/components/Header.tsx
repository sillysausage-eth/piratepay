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
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">PiratePay</h1>
        <Balance />
      </div>
      <ConnectButton
        client={client}
        wallets={[
          inAppWallet({
            smartAccount: {
              chain: defaultChain,
              sponsorGas: true,
            },
            auth: {
              options: ["google"],
            },
          }),
        ]}
        accountAbstraction={{
          chain: defaultChain,
          sponsorGas: true,
        }}
        theme="dark"
      />

      {isModalOpen && (
        <WalletModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
} 