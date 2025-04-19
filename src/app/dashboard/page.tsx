"use client";

import { useActiveAccount, ConnectButton } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Balance from "../components/Balance";
import { formatUnits } from "viem";
import { base } from "thirdweb/chains";
import { client } from "../client";
import { useSendTransaction } from "thirdweb/react";
import { prepareTransaction } from "thirdweb";
import { PayEmbed } from "thirdweb/react";
import { getUserEmail } from "thirdweb/wallets";

export default function DashboardPage() {
  const router = useRouter();
  const account = useActiveAccount();
  const { mutate: send } = useSendTransaction();
  const [showPayEmbed, setShowPayEmbed] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!account) {
      router.push("/login");
    }
  }, [account, router]);

  useEffect(() => {
    const fetchEmail = async () => {
      if (!account) return;
      try {
        const email = await getUserEmail({ client });
        setEmail(email || null);
      } catch (error) {
        console.error("Error fetching email:", error);
        setEmail(null);
      }
    };
    fetchEmail();
  }, [account]);

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

  const handleCopyAddress = async () => {
    if (account?.address) {
      await navigator.clipboard.writeText(account.address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const truncatedAddress = account?.address 
    ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}`
    : "";

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
            onClick={() => setShowDetailsModal(true)}
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
                metadata: {
                  name: "Add Funds",
                },
                prefillBuy: {
                  chain: base,
                  token: {
                    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
                    name: "USD Coin",
                    symbol: "USDC"
                  },
                  allowEdits: {
                    chain: false,
                    token: false,
                    amount: true
                  }
                }
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

      {/* Details Modal */}
      {showDetailsModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowDetailsModal(false)}
        >
          <div 
            className="bg-[#1A1A1A] rounded-lg p-6 w-[90%] max-w-[400px]"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl text-white mb-6">Account Details</h3>
            <div className="space-y-4">
              <div>
                <h3 className="text-white/70 mb-1">Wallet Address</h3>
                <div className="flex items-center gap-2">
                  <p className="text-white">{truncatedAddress}</p>
                  <button
                    onClick={handleCopyAddress}
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label="Copy wallet address"
                  >
                    {copySuccess ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 4V16C8 17.1046 8.89543 18 10 18H18C19.1046 18 20 17.1046 20 16V7.41421C20 6.88378 19.7893 6.37507 19.4142 6L16 2.58579C15.6249 2.21071 15.1162 2 14.5858 2H10C8.89543 2 8 2.89543 8 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 4V4C16 5.10457 16.8954 6 18 6H20V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 8V20C4 21.1046 4.89543 22 6 22H14C15.1046 22 16 21.1046 16 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-white/70 mb-1">Email</h3>
                <p className="text-white">{email || "Not connected"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 