import * as React from "react";
import { getTranslations } from "next-intl/server";
import { columns } from "./components/columns";
import { getKolTop } from "@/app/[locale]/dashboard/api/twitter";
import DataSourceSelect from "@/app/[locale]/twitterFeeds/tweets/components/data-source-select";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Loading from "@/app/[locale]/loading";
import { Suspense } from "react";
import { DataTableWrap } from "@/app/[locale]/twitterFeeds/airdrops/components/data-table-wrap";

interface TwitterFeedsAirdropsPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    group: string;
    recentHours: string;
  };
}

export default async function TwitterFeedsAirdrops({
  params,
  searchParams,
}: TwitterFeedsAirdropsPageProps) {
  // console.log("params: ", params);
  // console.log("searchParams: ", searchParams);
  const group = searchParams?.group ?? "airdropEn";
  const recentHours = searchParams?.recentHours ?? "24h";
  const suspenseKey = `${group};${recentHours};`;
  const t = await getTranslations();
  // const tasks = await getKolTop(group, recentHours, isThread);

  async function DataTableComponent() {
    const tasks = await getKolTop(group, recentHours, false);
    // console.log("tasks: ", tasks);
    return (
      <DataTableWrap
        data={tasks}
        columns={columns}
        tagName={t("twitterFeed.tagName")}
        filterCrypto={{
          yes: t("twitterFeed.filterAirdropYes"),
          no: t("twitterFeed.filterAirdropNo"),
        }}
        needTranslation={(params?.locale ?? "en-US") === "zh-CN"}
      />
    );
  }

  function LoadStatic() {
    return (
      <>
        <h1 className="text-2xl font-bold tracking-tight py-5">
          {t("twitterFeed.tweetsHead")}
        </h1>
        <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
          <DataSourceSelect
            placeholder={t("twitterFeed.group")}
            dataSource={"group"}
            // @ts-ignore
            defaultValue={group}
          >
            <SelectItem value="airdropEn">
              {t("dashboard.airdropEn")}
            </SelectItem>
            <SelectItem value="airdropCn">
              {t("dashboard.airdropCn")}
            </SelectItem>
          </DataSourceSelect>
          <DataSourceSelect
            placeholder={t("twitterFeed.recentHours")}
            dataSource={"recentHours"}
            // @ts-ignore
            defaultValue={recentHours}
          >
            <SelectItem value="24h">{t("twitterFeed.24h")}</SelectItem>
            <SelectItem value="48h">{t("twitterFeed.48h")}</SelectItem>
            <SelectItem value="168h">{t("twitterFeed.7d")}</SelectItem>
          </DataSourceSelect>
        </div>
        {/*<div className="grid grid-cols-1 justify-items-center w-full">*/}
        {/*</div>*/}
      </>
    );
  }

  return (
    // <Suspense
    //   fallback={
    //     <main className="flex min-h-screen flex-col items-center justify-between p-2 w-full">
    //       <div className="flex flex-col justify-start space-y-5 w-full">
    //         <LoadStatic />
    //         <Loading />
    //       </div>
    //     </main>
    //   }
    // >
    //   <main className="flex min-h-screen flex-col items-center justify-between p-2 w-full">
    //     <div className="flex flex-col justify-start space-y-5 w-full">
    //       <LoadStatic />
    //       {/*@ts-ignore*/}
    //       <DataTableComponent />
    //     </div>
    //   </main>
    // </Suspense>

    <main className="flex min-h-screen flex-col items-center justify-between p-2 w-full">
      <div className="flex flex-col justify-start space-y-5 w-full">
        <LoadStatic />
        <Suspense key={suspenseKey} fallback={<Loading />}>
          {/*@ts-ignore*/}
          <DataTableComponent />
        </Suspense>
      </div>
    </main>
  );
}
