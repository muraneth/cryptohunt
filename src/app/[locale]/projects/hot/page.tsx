import * as React from "react";
import { getTranslations } from "next-intl/server";
import { topTwitterUserColumns } from "./components/columns";
import { getKolTopFollowing } from "@/app/[locale]/dashboard/api/twitter";
import DataSourceSelect from "@/app/[locale]/twitterFeeds/tweets/components/data-source-select";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/app/[locale]/loading";
import { Suspense } from "react";
import { DataTable } from "@/app/[locale]/twitterFeeds/tweets/components/data-table";

interface ProjectsHotPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    group: string;
    daysOffset: string;
  };
}

export default async function ProjectsHot({
  params,
  searchParams,
}: ProjectsHotPageProps) {
  // console.log("params: ", params);
  // console.log("searchParams: ", searchParams);
  const group = searchParams?.group ?? "all";
  const daysOffset = searchParams?.daysOffset ?? "1";
  const suspenseKey = `${group};${daysOffset};`;
  const t = await getTranslations();

  async function DataTableComponent() {
    const tasks = await getKolTopFollowing(group, daysOffset);
    return (
      <>
        <DataTable data={tasks} columns={topTwitterUserColumns} />
      </>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 w-full">
      <div className="flex flex-col justify-start space-y-5 w-full">
        <h1 className="text-2xl font-bold tracking-tight py-5">
          {t("project.hotProjects")}
        </h1>
        <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
          <DataSourceSelect
            placeholder={t("twitterFeed.group")}
            dataSource={"group"}
            // @ts-ignore
            defaultValue={group}
          >
            <SelectItem value="all">{t("dashboard.all")}</SelectItem>
            <SelectItem value="cn">{t("dashboard.cn")}</SelectItem>
          </DataSourceSelect>
          <DataSourceSelect
            placeholder={t("twitterFeed.daysOffset")}
            dataSource={"daysOffset"}
            // @ts-ignore
            defaultValue={daysOffset}
          >
            <SelectItem value="1">{`1 ${t("twitterFeed.days")}`}</SelectItem>
            <SelectItem value="2">{`2 ${t("twitterFeed.days")}`}</SelectItem>
            <SelectItem value="3">{`3 ${t("twitterFeed.days")}`}</SelectItem>
            <SelectItem value="5">{`5 ${t("twitterFeed.days")}`}</SelectItem>
            <SelectItem value="7">{`7 ${t("twitterFeed.days")}`}</SelectItem>
            <SelectItem value="14">{`14 ${t("twitterFeed.days")}`}</SelectItem>
            <SelectItem value="30">{`30 ${t("twitterFeed.days")}`}</SelectItem>
          </DataSourceSelect>
        </div>
        <Suspense key={suspenseKey} fallback={<Loading />}>
          {/*@ts-ignore*/}
          <DataTableComponent />
        </Suspense>
      </div>
    </main>
  );
}
