import { SiweMessage } from "siwe";
import { NextResponse } from "next/server";
// import {getCsrfToken} from "next-auth/react";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address: string = searchParams.get("address") ?? "";
  const chainId: number = parseInt(searchParams.get("chainId") ?? "-1") ?? -1;
  const domain: string = searchParams.get("domain") ?? "";
  const uri: string = searchParams.get("uri") ?? "";
  const nonce: string = searchParams.get("nonce") ?? "";

  try {
    const message = new SiweMessage({
      domain: domain,
      uri: uri,
      address: address,
      statement: "Sign in with Ethereum to the app.",
      version: "1",
      chainId: chainId,
      // nonce: await getCsrfToken({ req }),
      nonce: nonce,
    });
    return NextResponse.json({
      data: message,
      message: message.prepareMessage(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      data: null,
    });
  }
}
