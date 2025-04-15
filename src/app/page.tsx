"use client";

import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootPage() {
  const router = useRouter();
  const account = useActiveAccount();

  useEffect(() => {
    if (account?.address) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [account, router]);

  // Show nothing while checking auth state
  return null;
}
