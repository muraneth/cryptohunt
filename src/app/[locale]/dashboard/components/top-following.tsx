import * as React from "react";
import Link from "next-intl/link";
import { DataTable } from "@/app/[locale]/dashboard/components/data-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ColumnDef } from "@tanstack/react-table";
import { getTranslations } from "next-intl/server";
import { getKolTopFollowing } from "@/app/[locale]/dashboard/api/twitter";
import {
  topTweetColumns,
  topTwitterUserColumns,
} from "@/app/[locale]/dashboard/components/columns";

export async function TopFollowing<TData, TValue>({ ...props }) {
  const t = await getTranslations();
  let task = await getKolTopFollowing("all", "1");
  task = task.filter((_) => _.classification === "project");
  return (
    <div
      className="w-full flex flex-col items-center border rounded-md"
      {...props}
    >
      <div className="w-full flex flex-col items-center border rounded-md">
        <div className="w-full flex justify-between p-4">
          <span>{t("dashboard.topFollowing")}</span>
          <Link href={"/projects/hot"}>
            <span className="text-secondary-foreground hover:underline">
              {t("more")}
            </span>
          </Link>
        </div>
        <ScrollArea className="h-[900px] w-full">
          {/*@ts-ignore*/}
          <DataTable data={task.slice(0, 20)} columns={topTwitterUserColumns} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
