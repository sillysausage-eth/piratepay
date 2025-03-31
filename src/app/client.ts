// @ts-check
import { createThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";

// Client ID for PiratePay - use environment variable in production, fallback for development
const clientId = process.env.NEXT_PUBLIC_TW_CLIENT_ID;

if (!clientId) {
  throw new Error("NEXT_PUBLIC_TW_CLIENT_ID environment variable is required");
}

export const client = createThirdwebClient({
  clientId: clientId,
});

// Default chain configuration
export const defaultChain = base;

// USDC contract address on Base
export const USDC_CONTRACT = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
