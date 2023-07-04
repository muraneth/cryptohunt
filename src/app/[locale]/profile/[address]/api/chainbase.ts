import {
  accountBalanceChainBase,
  accountBalanceChainBaseSchema,
} from "@/app/[locale]/profile/[address]/data/schema";
import { getServerSession } from "next-auth";

export async function getAccountBalanceChainBase(
  address: string,
  networkId: number
): Promise<accountBalanceChainBase> {
  const session = await getServerSession();
  const response = await fetch(
    `https://api.chainbase.online/v1`,
    // { next: { revalidate: 60 } }
    {
      method: "POST",
      body: JSON.stringify({
        action: "getAccountBalance",
        chain_id: networkId,
        address: address,
      }),
      headers: {
        "X-Api-Key": "2B1MJDV2SM1wkGVZLMopOBYdGdp",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  const originData = accountBalanceChainBaseSchema.parse(data);
  return originData;
}
