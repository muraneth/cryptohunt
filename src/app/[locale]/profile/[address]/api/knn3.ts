import { getServerSession } from "next-auth";
import { z } from "zod";
import {
  attendEventsRnn3,
  attendEventsRnn3Schema,
  holdNftsRnn3,
  holdNftsRnn3Schema,
  holdTokensRnn3,
  holdTokensRnn3Schema,
} from "@/app/[locale]/profile/[address]/data/schema";

export async function getHoldTokensRnn3(
  address: string,
  network: string
): Promise<holdTokensRnn3[]> {
  const session = await getServerSession();
  const response = await fetch(
    `https://knn3-gateway.knn3.xyz/data-api/api/addresses/holdTokens?address=${address}&network=${network}`,
    // { next: { revalidate: 60 } }
    {
      headers: {
        "auth-key":
          "70a5952e8cfe3e380ef581c8bb85606036e3cbf047ac0fd51804002e857226d7",
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  const originData = z.array(holdTokensRnn3Schema).parse(data.list);
  return originData.filter((_) => _.symbol.length < 10 && _.symbol.length > 0);
}

export async function getHoldNftsRnn3(
  address: string,
  network: string
): Promise<holdNftsRnn3[]> {
  const session = await getServerSession();
  const response = await fetch(
    `https://knn3-gateway.knn3.xyz/data-api/api/addresses/holdNfts?address=${address}&network=${network}`,
    // { next: { revalidate: 60 } }
    {
      headers: {
        "auth-key":
          "70a5952e8cfe3e380ef581c8bb85606036e3cbf047ac0fd51804002e857226d7",
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  const originData = z.array(holdNftsRnn3Schema).parse(data.list);
  return originData.filter((_) => _.symbol.length < 10 && _.symbol.length > 0);
}

export async function getAttendEventsRnn3(
  address: string
): Promise<attendEventsRnn3[]> {
  const session = await getServerSession();
  const response = await fetch(
    `https://knn3-gateway.knn3.xyz/data-api/api/addresses/attendEvents?address=${address}`,
    // { next: { revalidate: 60 } }
    {
      headers: {
        "auth-key":
          "70a5952e8cfe3e380ef581c8bb85606036e3cbf047ac0fd51804002e857226d7",
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  const originData = z.array(attendEventsRnn3Schema).parse(data.list);
  return originData.filter((_) => _.name.length > 0);
}
