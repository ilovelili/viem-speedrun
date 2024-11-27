import dotenv from "dotenv";
import { createWalletClient, http, publicActions } from "viem";
import { Address, privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import funJson from "../artifacts/Fun.json";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) {
  throw new Error("PRIVATE_KEY is required");
}

const { abi, bin } = funJson["contracts"]["Fun.sol:Fun"];
const account = privateKeyToAccount(privateKey as Address);

(async () => {
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(process.env.API_URL),
  }).extend(publicActions);

  const balance = await walletClient.getBalance({ address: account.address });
  console.log(`your balance is: ${balance}`);

  const hash = await walletClient.deployContract({
    abi,
    bytecode: `0x${bin}`,
    args: [1],
  });

  console.log(`contract address: ${hash}`);

  // need time sleep?
  const { contractAddress } = await walletClient.getTransactionReceipt({
    hash,
  });

  if (contractAddress) {
    const x = await walletClient.readContract({
      address: contractAddress,
      abi,
      functionName: "x",
    });

    console.log(`x value: ${x}`);
  }
})();
