import * as React from "react";
import Loading from "@/app/[locale]/loading";
import { Suspense } from "react";
import { TopTweet } from "@/app/[locale]/dashboard/components/top-tweet";
import { TopThread } from "@/app/[locale]/dashboard/components/top-thread";
import { TopHashtag } from "@/app/[locale]/dashboard/components/top-hashtag";
import { TopCashtag } from "@/app/[locale]/dashboard/components/top-cashtag";
import HashTagWordCloud from "@/app/[locale]/dashboard/components/hashtag-wordcloud";
import { TopTweetAirdrop } from "@/app/[locale]/dashboard/components/top-tweet-airdrop";
import { TopTweetSummary } from "@/app/[locale]/dashboard/components/top-tweet-summary";

// interface DashboardPageProps {
//   params: {
//     group: string[];
//   };
// }
//
// { params }: DashboardPageProps

export default async function Dashboard() {
  // const groupParam = params.group?.[0];
  // console.log("groupParam: ", groupParam);
  // const group = groupParam === "cn" ? "cn" : "all";
  // const group = "all";
  // const t = await getTranslations();
  // const tasks = await Promise.all([
  //   getKolTop(group, "24h", false),
  //   getKolTop(group, "24h", true),
  //   getKolOthers(group, "Hashtags"),
  //   getKolOthers(group, "Cashtags"),
  //   getKolOthers(group, "Following"),
  // ]);
  // console.log("tasks: ", tasks);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center w-full">
        <Suspense fallback={<Loading />} key={"TopTweetAll"}>
          {/*@ts-ignore*/}
          <TopTweetSummary group={"all"} recentHours={"24h"} isThread={false} />
        </Suspense>
        <Suspense fallback={<Loading />} key={"TopTweetCn"}>
          {/*@ts-ignore*/}
          <TopTweetSummary group={"cn"} recentHours={"24h"} isThread={false} />
        </Suspense>
        {/*<Suspense fallback={<Loading />} key={"TopTweetAirdropEn"}>*/}
        {/*  /!*@ts-ignore*!/*/}
        {/*  <TopTweetSummary*/}
        {/*    group={"airdropEn"}*/}
        {/*    recentHours={"24h"}*/}
        {/*    isThread={false}*/}
        {/*  />*/}
        {/*</Suspense>*/}
        <Suspense fallback={<Loading />} key={"TopTweetAirdropCn"}>
          {/*@ts-ignore*/}
          <TopTweetSummary
            group={"airdropCn"}
            recentHours={"24h"}
            isThread={false}
          />
        </Suspense>
      </div>
    </main>
  );
}
