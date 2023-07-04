import * as React from "react";
import Loading from "@/app/[locale]/loading";
import { Suspense } from "react";
import { TopTweet } from "@/app/[locale]/dashboard/components/top-tweet";
import { TopThread } from "@/app/[locale]/dashboard/components/top-thread";
import { TopHashtag } from "@/app/[locale]/dashboard/components/top-hashtag";
import { TopCashtag } from "@/app/[locale]/dashboard/components/top-cashtag";
import HashTagWordCloud from "@/app/[locale]/dashboard/components/hashtag-wordcloud";
import { TopTweetAirdrop } from "@/app/[locale]/dashboard/components/top-tweet-airdrop";

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
          <TopTweet group={"all"} />
        </Suspense>
        <Suspense fallback={<Loading />} key={"TopTweetCn"}>
          {/*@ts-ignore*/}
          <TopTweet group={"cn"} />
        </Suspense>
        <Suspense fallback={<Loading />} key={"TopThreadAll"}>
          {/*@ts-ignore*/}
          <TopThread group={"all"} />
        </Suspense>
        <Suspense fallback={<Loading />} key={"TopThreadCn"}>
          {/*@ts-ignore*/}
          <TopThread group={"cn"} />
        </Suspense>
        <Suspense fallback={<Loading />} key={"TopTweetAirdropEn"}>
          {/*@ts-ignore*/}
          <TopTweetAirdrop group={"airdropEn"} />
        </Suspense>
        <Suspense fallback={<Loading />} key={"TopTweetAirdropCn"}>
          {/*@ts-ignore*/}
          <TopTweetAirdrop group={"airdropCn"} />
        </Suspense>
        <Suspense fallback={<Loading />} key={"TopHashtag"}>
          {/*@ts-ignore*/}
          <TopHashtag />
        </Suspense>
        <Suspense fallback={<Loading />} key={"TopCashtag"}>
          {/*@ts-ignore*/}
          <TopCashtag />
        </Suspense>
        {/*<Suspense fallback={<Loading />} key={"topThread"}>*/}
        {/*  <KolTop*/}
        {/*    title={t("dashboard.topThread")}*/}
        {/*    more={t("more")}*/}
        {/*    tasks={tasks[1].slice(0, 20)}*/}
        {/*    columns={topTweetColumns}*/}
        {/*    href={"/twitterFeeds/tweets"}*/}
        {/*  />*/}
        {/*</Suspense>*/}
        {/*<Suspense fallback={<Loading />} key={"topHashtag"}>*/}
        {/*  <KolTop*/}
        {/*    title={t("dashboard.topHashtag")}*/}
        {/*    more={t("more")}*/}
        {/*    tasks={tasks[2].slice(0, 50)}*/}
        {/*    columns={topTagColumns}*/}
        {/*    href={"/twitterFeeds/tweets"}*/}
        {/*  />*/}
        {/*</Suspense>*/}
        {/*<Suspense fallback={<Loading />} key={"topCashtag"}>*/}
        {/*  <KolTop*/}
        {/*    title={t("dashboard.topCashtag")}*/}
        {/*    more={t("more")}*/}
        {/*    tasks={tasks[3].slice(0, 50)}*/}
        {/*    columns={topTagColumns}*/}
        {/*    href={"/twitterFeeds/tweets"}*/}
        {/*  />*/}
        {/*</Suspense>*/}
        {/*<Suspense fallback={<Loading />} key={"topFollowing"}>*/}
        {/*  <KolTop*/}
        {/*    title={t("dashboard.topFollowing")}*/}
        {/*    more={t("more")}*/}
        {/*    tasks={tasks[4].slice(0, 50)}*/}
        {/*    columns={topTwitterUserColumns}*/}
        {/*    href={"/twitterFeeds/tweets"}*/}
        {/*  />*/}
        {/*</Suspense>*/}
      </div>
    </main>
  );
}
