import * as React from "react";
import Link from "next-intl/link";
import { DataTable } from "@/app/[locale]/dashboard/components/data-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ColumnDef } from "@tanstack/react-table";
import { getTranslations } from "next-intl/server";
import {
  getKolTop,
  getKolTweetSummary,
} from "@/app/[locale]/dashboard/api/twitter";
import { topTweetColumns } from "@/app/[locale]/dashboard/components/columns-summary";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

export async function TopTweetSummary({
  group,
  recentHours,
  isThread,
  ...props
}: {
  group: string;
  recentHours: string;
  isThread: boolean;
}) {
  const t = await getTranslations();
  let task = await getKolTweetSummary(group, recentHours, isThread);
  return (
    <div
      className="w-full flex flex-col items-center border rounded-md"
      {...props}
    >
      <div className="w-full flex flex-col items-center border rounded-md">
        <div className="w-full flex justify-between p-4 h-[60px]">
          <div className="flex space-x-1 items-center">
            <span>
              {t(
                `dashboard.top${isThread ? "Thread" : "Tweet"}${
                  group.charAt(0).toUpperCase() + group.slice(1)
                }`
              )}
            </span>
          </div>
          {/*<Link href={`/twitterFeeds/tweets?group=${group}&isThread=false`}>*/}
          {/*  <span className="text-secondary-foreground hover:underline">*/}
          {/*    {t("more")}*/}
          {/*  </span>*/}
          {/*</Link>*/}
          <span></span>
        </div>
        <ScrollArea className="h-[600px] w-full">
          <DataTable data={task.slice(0, 10)} columns={topTweetColumns} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
