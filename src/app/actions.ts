'use server';

import { cookies } from 'next/headers';

export async function handleAuth(walletAddress: string) {
  cookies().set("thirdweb_connected_wallet", walletAddress, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
} 