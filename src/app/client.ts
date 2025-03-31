// @ts-check
import { createThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";

// Create the client with the public client ID
export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_TW_CLIENT_ID || "",
  secretKey: process.env.NEXT_PUBLIC_TW_CLIENT_ID || "", // Using client ID as secret key since it's public
});

// Default chain configuration
export const defaultChain = base;

// USDC contract address on Base
export const USDC_CONTRACT = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
