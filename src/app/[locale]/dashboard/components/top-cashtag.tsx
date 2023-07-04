import * as React from "react";
import Link from "next-intl/link";
import { DataTable } from "@/app/[locale]/dashboard/components/data-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ColumnDef } from "@tanstack/react-table";
import { getTranslations } from "next-intl/server";
import { getKolTopCashtags } from "@/app/[locale]/dashboard/api/twitter";
import { topCashTagColumns } from "@/app/[locale]/dashboard/components/columns";
import HashTagWordCloud from "@/app/[locale]/dashboard/components/hashtag-wordcloud";

export async function TopCashtag<TData, TValue>({ ...props }) {
  const t = await getTranslations();
  const task = await getKolTopCashtags("all", "1");
  return (
    <div
      className="w-full flex flex-col items-center border rounded-md"
      {...props}
    >
      <div className="w-full flex flex-col items-center border rounded-md">
        <div className="w-full flex justify-between p-4">
          <span>{t("dashboard.topCashtag")}</span>
          <Link href={"/twitterFeeds/tags?tag=cash"}>
            <span className="text-secondary-foreground hover:underline">
              {t("more")}
            </span>
          </Link>
        </div>
        <ScrollArea className="h-[600px] w-full">
          <HashTagWordCloud data={task.slice(0, 50)} daysOffset={"1"} />
          <DataTable data={task.slice(0, 20)} columns={topCashTagColumns} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
