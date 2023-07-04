import * as React from "react";
import Link from "next-intl/link";
import { DataTable } from "@/app/[locale]/dashboard/components/data-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ColumnDef } from "@tanstack/react-table";
import { getTranslations } from "next-intl/server";
import { getKolAllFollowing } from "@/app/[locale]/dashboard/api/twitter";
import {
  newProjectColumns,
  topTweetColumns,
  topTwitterUserColumns,
} from "@/app/[locale]/dashboard/components/columns";

export async function NewProject<TData, TValue>({ ...props }) {
  const t = await getTranslations();
  let task = await getKolAllFollowing("all", "30", "10000", "0");
  task = task.filter((_) => _.classification === "project");
  return (
    <div
      className="w-full flex flex-col items-center border rounded-md"
      {...props}
    >
      <div className="w-full flex flex-col items-center border rounded-md">
        <div className="w-full flex justify-between p-4">
          <span>{t("dashboard.newProject")}</span>
          <Link href={"/projects/new"}>
            <span className="text-secondary-foreground hover:underline">
              {t("more")}
            </span>
          </Link>
        </div>
        <ScrollArea className="h-[900px] w-full">
          <DataTable data={task.slice(0, 20)} columns={newProjectColumns} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
