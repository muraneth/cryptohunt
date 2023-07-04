import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import { User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getAttendEventsRnn3,
  getHoldNftsRnn3,
  getHoldTokensRnn3,
} from "@/app/[locale]/profile/[address]/api/knn3";
import { memo, Suspense, useMemo } from "react";
import { SummaryRelevantTweets } from "@/app/[locale]/profile/[address]/components/summary-relevant-tweets";
import Loading from "@/app/[locale]/loading";
import { getAccountBalanceChainBase } from "@/app/[locale]/profile/[address]/api/chainbase";
import {
  accountBalanceChainBase,
  attendEventsRnn3,
  holdNftsRnn3,
  holdTokensRnn3,
} from "@/app/[locale]/profile/[address]/data/schema";
import Link from "next/link";
import { numberFormat } from "@/lib/utils";

interface ProfilePageProps {
  params: {
    locale: string;
    address: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const holdTokensRnn3 = await getHoldTokensRnn3(params.address, "ethereum");
  const holdNftsRnn3 = await getHoldNftsRnn3(params.address, "ethereum");
  const attendEventsRnn3s = await getAttendEventsRnn3(params.address);
  const accountBalanceChainBase = await getAccountBalanceChainBase(
    params.address,
    1
  );
  // const [
  //   holdTokensRnn3,
  //   holdNftsRnn3,
  //   attendEventsRnn3s,
  //   accountBalanceChainBase,
  // ]: [
  //   holdTokensRnn3[],
  //   holdNftsRnn3[],
  //   attendEventsRnn3[],
  //   accountBalanceChainBase
  // ] = await Promise.all([
  //   getHoldTokensRnn3(params.address, "ethereum"),
  //   getHoldNftsRnn3(params.address, "ethereum"),
  //   getAttendEventsRnn3(params.address),
  //   getAccountBalanceChainBase(params.address, 1),
  // ]);
  const tokenLength = holdTokensRnn3.length;
  const nftLength = holdNftsRnn3.length;
  const attendEventsLength = attendEventsRnn3s.length;

  // const accountBalanceChainBase = await getAccountBalanceChainBase(
  //   params.address,
  //   1
  // );
  const ethBalance =
    Number(BigInt(parseInt(accountBalanceChainBase.data, 16))) /
    Number(BigInt(10 ** 18));
  const keywords = ["ETH"]
    .concat(
      holdTokensRnn3.map((_) => {
        return _.symbol;
      })
    )
    .concat(
      holdNftsRnn3.map((_) => {
        return _.symbol;
      })
    )
    .join(",");
  // console.log("keywords: ", keywords);

  // eslint-disable-next-line react/display-name
  const TokenCardAgg = memo(() => {
    return (
      <>
        {holdTokensRnn3.map((token) => {
          const balance =
            Number(BigInt(Number(token.count))) /
            Number(BigInt(10 ** parseInt(token.decimal)));
          return (
            <>
              {parseInt(balance.toString()) > 0 ? (
                <div className="rounded-md flex flex-col space-y-1 bg-[#eff3f8]/10 p-2">
                  <span>{token.symbol}</span>
                  <span>{numberFormat(balance)}</span>
                </div>
              ) : null}
            </>
          );
        })}
      </>
    );
  });

  // eslint-disable-next-line react/display-name
  const NftCardAgg = memo(() => {
    return (
      <>
        {nftLength > 0
          ? holdNftsRnn3.map((nft) => {
              return (
                <div
                  className="flex space-x-6 items-center bg-[#eff3f8]/10 p-2"
                  key={nft.contract}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={nft.imageurl} alt={nft.symbol} />
                    <AvatarFallback>{""}</AvatarFallback>
                  </Avatar>
                  <div className="rounded-md flex flex-col space-y-1 mx-6">
                    <span>{nft.symbol}</span>
                    <span>{nft.count}</span>
                  </div>
                </div>
              );
            })
          : "None"}
      </>
    );
  });

  // eslint-disable-next-line react/display-name
  const AttendEventsCardAgg = memo(() => {
    return (
      <>
        {attendEventsLength > 0
          ? attendEventsRnn3s.map((event) => {
              return (
                <div
                  className="flex space-x-6 items-center bg-[#eff3f8]/10 p-2"
                  key={event.id}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={event.imageUrl} alt={event.name} />
                    <AvatarFallback>{""}</AvatarFallback>
                  </Avatar>
                  <div className="rounded-md flex flex-col space-y-1 mx-6">
                    <span>{event.name}</span>
                    <span></span>
                  </div>
                </div>
              );
            })
          : "None"}
      </>
    );
  });

  return (
    <div className="w-[90%] lg:w-[70%] mx-auto my-5">
      <Tabs defaultValue="token" className="w-full flex-1">
        <div className="w-full flex flex-col items-center space-y-5">
          <div className="w-full bg-accent-foreground/10 rounded-md flex flex-col space-y-5 px-3 pt-3">
            <div>
              <span className="text-lg font-medium">Profile</span>
            </div>
            <div className="flex space-x-4 items-center">
              <div>
                <Avatar className="h-16 w-16">
                  <AvatarFallback>
                    <User2 />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col space-y-2 justify-start">
                <div>{params.address}</div>
                <div className="flex space-x-2">
                  <Badge
                    variant="outline"
                    className="dark:bg-[#162312] text-[#49aa19] my-0.5"
                  >
                    {`Tokens: ${tokenLength}`}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="dark:bg-[#162312] text-[#49aa19] my-0.5"
                  >
                    {`NFTs: ${nftLength}`}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="dark:bg-[#162312] text-[#49aa19] my-0.5"
                  >
                    {`Events: ${attendEventsLength}`}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="token" className="w-20">
                  <span>Token</span>
                </TabsTrigger>
                <TabsTrigger value="nft" className="w-20">
                  <span>NFT</span>
                </TabsTrigger>
                <TabsTrigger value="attendEvent" className="w-20">
                  <span>Event</span>
                </TabsTrigger>
              </TabsList>
              <div className="text-sm dark:text-accent-foreground/50">
                <span>Data powered by </span>
                <Link href={"https://www.knn3.xyz/"} target={"_blank"}>
                  <span className="underline">KNN3</span>
                </Link>
                <span>, </span>
                <Link href={"https://chainbase.com/"} target={"_blank"}>
                  <span className="underline">ChainBase</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full bg-accent-foreground/10 rounded-md flex flex-col space-y-5 p-3">
            <TabsContent value="token" className="mt-0 border-0 p-0">
              <div className="grid grid-cols-4 gap-4">
                <div className="rounded-md flex flex-col space-y-1 bg-[#eff3f8]/10 p-2">
                  <span>ETH</span>
                  <span>{ethBalance.toLocaleString()}</span>
                </div>
                {/*{holdTokensRnn3.map((token) => (*/}
                {/*  <TokenCard key={token.contract} token={token} />*/}
                {/*))}*/}
                {/*@ts-ignore*/}
                <TokenCardAgg />
              </div>
            </TabsContent>
            <TabsContent value="nft" className="mt-0 border-0 p-0">
              <div className="grid grid-cols-4 gap-4">
                {/*{holdNftsRnn3.map((nft) => (*/}
                {/*  <NftCard key={nft.contract} nft={nft} />*/}
                {/*))}*/}
                <NftCardAgg />
              </div>
            </TabsContent>
            <TabsContent value="attendEvent" className="mt-0 border-0 p-0">
              <div className="grid grid-cols-4 gap-4">
                {/*{holdNftsRnn3.map((nft) => (*/}
                {/*  <NftCard key={nft.contract} nft={nft} />*/}
                {/*))}*/}
                <AttendEventsCardAgg />
              </div>
            </TabsContent>
          </div>
          <div className="w-full bg-accent-foreground/10 rounded-md flex flex-col space-y-5 p-3">
            <Suspense
              fallback={
                <>
                  <div className="flex space-x-3 items-center">
                    <span>News loading...</span>
                    <Loading />
                  </div>
                </>
              }
              key={"SummaryRelevantTweets"}
            >
              {/*@ts-ignore*/}
              <SummaryRelevantTweets keywords={keywords} />
            </Suspense>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
