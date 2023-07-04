import * as React from "react";
import { getTranslations } from "next-intl/server";
import { newProjectColumns } from "./components/columns";
import {
  getKolAllFollowing,
  getKolTopFollowing,
} from "@/app/[locale]/dashboard/api/twitter";
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
import SliderSelect from "@/app/[locale]/projects/new/components/slider-select";

interface ProjectsNewPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    group: string;
    creationOffset: string;
    followerLimit: string;
    followerMin: string;
  };
}

export default async function ProjectsNew({
  params,
  searchParams,
}: ProjectsNewPageProps) {
  // console.log("params: ", params);
  // console.log("searchParams: ", searchParams);
  const group = searchParams?.group ?? "all";
  const creationOffset = searchParams?.creationOffset ?? "30";
  const followerLimit = searchParams?.followerLimit ?? "10000";
  const followerMin = searchParams?.followerMin ?? "0";
  const suspenseKey = `${group};${creationOffset};${followerLimit};${followerMin};`;
  const t = await getTranslations();

  async function DataTableComponent() {
    const tasks = await getKolAllFollowing(
      group,
      creationOffset,
      followerLimit,
      followerMin
    );
    return (
      <>
        <DataTable data={tasks} columns={newProjectColumns} />
      </>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 w-full">
      <div className="flex flex-col justify-start space-y-5 w-full">
        <h1 className="text-2xl font-bold tracking-tight py-5">
          {t("project.newProjects")}
        </h1>
        <div className="flex flex-col space-y-3 md:flex-row md:space-x-6 md:space-y-0 md:items-center">
          <DataSourceSelect
            placeholder={t("twitterFeed.group")}
            dataSource={"group"}
            // @ts-ignore
            defaultValue={group}
          >
            <SelectItem value="all">{t("dashboard.all")}</SelectItem>
            <SelectItem value="cn">{t("dashboard.cn")}</SelectItem>
          </DataSourceSelect>
          <SliderSelect
            label={t("project.creationOffset")}
            dataSource={"creationOffset"}
            maxRange={90}
            stepRange={1}
            defaultRange={30}
          />
          <SliderSelect
            label={t("project.followerLimit")}
            dataSource={"followerLimit"}
            maxRange={100000}
            stepRange={1000}
            defaultRange={10000}
          />
        </div>
        <Suspense key={suspenseKey} fallback={<Loading />}>
          {/*@ts-ignore*/}
          <DataTableComponent />
        </Suspense>
      </div>
    </main>
  );
}
