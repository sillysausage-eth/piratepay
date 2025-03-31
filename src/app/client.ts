// @ts-check
import { createThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";

// Create the client with the client ID directly
export const client = createThirdwebClient({
  clientId: "a14090c90fef7f70ca2343af69931248",
});

// Default chain configuration
export const defaultChain = base;

// USDC contract address on Base
export const USDC_CONTRACT = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
