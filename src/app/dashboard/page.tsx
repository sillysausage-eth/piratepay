"use client";

import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Balance from "../components/Balance";
import { formatUnits } from "viem";
import { base } from "thirdweb/chains";
import { client } from "../client";
import { ConnectButton, useSendTransaction } from "thirdweb/react";
import { prepareTransaction } from "thirdweb";
import { PayEmbed } from "thirdweb/react";

export default function DashboardPage() {
  const router = useRouter();
  const account = useActiveAccount();
  const { mutate: send } = useSendTransaction();
  const [showPayEmbed, setShowPayEmbed] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");

  useEffect(() => {
    if (!account?.address) {
      router.push("/login");
    }
  }, [account, router]);

  const handleAddMoney = () => {
    setShowPayEmbed(true);
  };

  const handleSend = async () => {
    if (!account || !sendAmount || !sendAddress) return;
    try {
      // Convert USD amount to USDC (6 decimals)
      const amountInUSDC = BigInt(Math.floor(parseFloat(sendAmount) * 1000000));
      const transaction = prepareTransaction({
        chain: base,
        client,
        to: sendAddress,
        value: amountInUSDC,
      });
      await send(transaction);
      setShowSendModal(false);
      setSendAmount("");
      setSendAddress("");
    } catch (error) {
      console.error("Failed to send transaction:", error);
    }
  };

  const balance = "125.00";
  // Convert the decimal string to a BigInt by removing the decimal point and converting to integer
  const balanceInWei = BigInt(Math.floor(parseFloat(balance) * 1000000));
  const formattedBalance = formatUnits(balanceInWei, 6);

  return (
    <>
      <div className="p-12 space-y-12">
        {/* Balance */}
        <div className="text-center">
          <div className="text-[72px] font-medium tracking-tight text-white">
            <Balance showLarge />
          </div>
          <div className="text-white/70">4.16% APY</div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center gap-8">
          <button 
            className="group flex flex-col items-center focus:outline-none"
            onClick={handleAddMoney}
            aria-label="Add money"
          >
            <div className="w-16 h-16 bg-[#E233FF] rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-105 group-focus:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-sm text-white/70 group-hover:text-white group-focus:text-white transition-colors">Add money</div>
          </button>

          <button 
            className="group flex flex-col items-center focus:outline-none"
            onClick={() => setShowSendModal(true)}
            aria-label="Withdraw funds"
          >
            <div className="w-16 h-16 bg-[#E233FF] rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-105 group-focus:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 19L12 5M19 12L12 19L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-sm text-white/70 group-hover:text-white group-focus:text-white transition-colors">Withdraw</div>
          </button>

          <button 
            className="group flex flex-col items-center focus:outline-none"
            aria-label="View details"
          >
            <div className="w-16 h-16 bg-[#E233FF] rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-105 group-focus:scale-105">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10H16M8 14H16M7 4H17C18.1046 4 19 4.89543 19 6V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V6C5 4.89543 5.89543 4 7 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-sm text-white/70 group-hover:text-white group-focus:text-white transition-colors">Details</div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#1A1A1A] rounded-lg p-6">
            <div className="text-white/70 mb-2">Earned this month</div>
            <div className="text-2xl text-white">$0.00</div>
            <div className="text-white/50 text-sm mt-4">All time</div>
            <div className="text-white/70">$0.00</div>
          </div>
          <div className="bg-[#1A1A1A] rounded-lg p-6">
            <div className="text-white/70 mb-2">Saved this month</div>
            <div className="text-2xl text-white">$0.00</div>
            <div className="text-white/50 text-sm mt-4">All time</div>
            <div className="text-white/70">$0.00</div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-[#1A1A1A] rounded-lg p-6">
          <h2 className="text-xl text-white mb-6">Recent Transactions</h2>
          <div className="text-center text-white/50 py-8">
            No transactions yet
          </div>
        </div>
      </div>

      {/* PayEmbed Modal */}
      {showPayEmbed && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPayEmbed(false)}
        >
          <div 
            className="w-full max-w-[480px] mx-auto"
            onClick={e => e.stopPropagation()}
          >
            <PayEmbed
              client={client}
              payOptions={{
                mode: "fund_wallet",
                buyWithCrypto: {
                  prefillSource: {
                    chain: base,
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      {/* Send Modal */}
      {showSendModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowSendModal(false)}
        >
          <div 
            className="bg-[#1A1A1A] rounded-lg p-6 w-[90%] max-w-[400px]"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl text-white mb-6">Withdraw funds</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 mb-2">Amount (USD)</label>
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#2A2A2A] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E233FF]"
                />
              </div>
              <div>
                <label className="block text-white/70 mb-2">Recipient Address</label>
                <input
                  type="text"
                  value={sendAddress}
                  onChange={(e) => setSendAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-[#2A2A2A] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E233FF]"
                />
              </div>
              <button
                onClick={handleSend}
                className="w-full bg-[#E233FF] text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 