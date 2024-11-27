import dotenv from "dotenv";
import { Address, createPublicClient, formatEther, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  throw new Error("PRIVATE_KEY is required");
}

const account = privateKeyToAccount(privateKey as Address);
console.log(`account address: ${account.address}`);

// IIFE
(async () => {
  const publicClient = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(process.env.API_URL),
  });

  const balance = await publicClient.getBalance({ address: account.address });

  // formatEther wei to ether
  // parseEther ether to wei
  console.log(formatEther(balance));

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
  });
  console.log(nonce);
})();
