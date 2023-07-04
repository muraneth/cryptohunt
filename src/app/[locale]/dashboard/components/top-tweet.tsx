import * as React from "react";
import Link from "next-intl/link";
import { DataTable } from "@/app/[locale]/dashboard/components/data-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ColumnDef } from "@tanstack/react-table";
import { getTranslations } from "next-intl/server";
import { getKolTop } from "@/app/[locale]/dashboard/api/twitter";
import { topTweetColumns } from "@/app/[locale]/dashboard/components/columns";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

export async function TopTweet({ group, ...props }: { group: string }) {
  const t = await getTranslations();
  let task = await getKolTop(group, "24h", false);
  task = task.filter((_) => _.web3OrCrypto);
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
                `dashboard.topTweet${
                  group.charAt(0).toUpperCase() + group.slice(1)
                }`
              )}
            </span>
            {group === "cn" ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-5 rounded-full p-0 hover:bg-background"
                    >
                      <HelpCircle className="h-4 w-4" />
                      <span className="sr-only">Help</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("dashboard.topTweetCnHelp")}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
          </div>
          <Link href={`/twitterFeeds/tweets?group=${group}&isThread=false`}>
            <span className="text-secondary-foreground hover:underline">
              {t("more")}
            </span>
          </Link>
        </div>
        <ScrollArea className="h-[600px] w-full">
          <DataTable data={task.slice(0, 10)} columns={topTweetColumns} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
