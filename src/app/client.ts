// @ts-check
import { createThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";

// Client ID for PiratePay - use environment variable in production, fallback for development
const clientId = process.env.NEXT_PUBLIC_TW_CLIENT_ID;

// In development, we can use a default client ID if none is provided
// In production, we require the environment variable
if (!clientId && process.env.NODE_ENV === "production") {
  throw new Error(
    "NEXT_PUBLIC_TW_CLIENT_ID environment variable is required in production. Please add it to your Vercel environment variables."
  );
}

// Create the client with either the provided client ID or a development fallback
export const client = createThirdwebClient({
  clientId: clientId || "development_client_id",
});

// Default chain configuration
export const defaultChain = base;

// USDC contract address on Base
export const USDC_CONTRACT = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
