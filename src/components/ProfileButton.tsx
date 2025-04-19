// ProfileButton component
// Created: 2024-03-21
// Shows user's email initial in a circle
// Updated: 2024-03-21 - Updated client import path

"use client";

import { useActiveAccount } from "thirdweb/react";
import { getUserEmail } from "thirdweb/wallets";
import { useEffect, useState } from "react";
import { client } from "../app/client";

export default function ProfileButton() {
  const account = useActiveAccount();
  const [email, setEmail] = useState<string | null>(null);
  
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

  const userInitial = email ? email[0].toUpperCase() : "?";

  return (
    <div className="w-10 h-10 bg-[#E233FF] rounded-full flex items-center justify-center text-white font-medium">
      {userInitial}
    </div>
  );
} 