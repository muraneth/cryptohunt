"use client";

import { ColumnDef } from "@tanstack/react-table";
import { topTweet } from "@/app/[locale]/dashboard/data/schema";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { SubscribeLock } from "@/components/subscribe-lock";
import * as React from "react";

export const columns: ColumnDef<topTweet>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row, table }) => (
      <div>{table?.getSortedRowModel()?.flatRows?.indexOf(row) + 1}</div>
    ),
  },
  {
    accessorKey: "text",
    // header: "Tweet",
    header: (header) => {
      const isFiltered =
        header.table.getPreFilteredRowModel().rows.length >
        header.table.getFilteredRowModel().rows.length;
      return (
        <div className="flex space-x-3 items-center">
          <span>Tweet</span>
          <Input
            placeholder="Filter Tweet..."
            value={
              (header.table.getColumn("text")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              header.table.getColumn("text")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[200px]"
          />
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => header.table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      );
    },
    size: 90,
    cell: ({ row }) => {
      const text = row.original.text;
      // const tags = row.original.tags;
      const airdropRelevant = row.original.airdropRelevant;
      const tweetId = row.original.id;
      const twitterUser = row.original.twitterUser;
      const createTime = row.original.createTime;
      return (
        <div className="flex flex-col space-y-1">
          <a
            target="_blank"
            href={`https://twitter.com/${twitterUser.username}`}
          >
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <span className="dark:text-accent-foreground/50">
                {moment(createTime).format("YYYY-MM-DD HH:mm")}
              </span>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <span>{twitterUser.name}</span>
                <span className="dark:text-accent-foreground/75">
                  @{twitterUser.username}
                </span>
              </div>
            </div>
          </a>
          <a
            target="_blank"
            href={`https://twitter.com/${twitterUser.username}/status/${tweetId}`}
          >
            <div className="lg:pr-4 xl:pr-6">
              <span className="text-justify break-words hyphens-auto dark:text-accent-foreground/50">
                {text}
              </span>
            </div>
          </a>
          <div className="flex space-x-1 flex-wrap items-center">
            {airdropRelevant ? (
              <Badge
                variant="outline"
                className="dark:bg-[#162312] text-[#49aa19] my-0.5"
              >
                {"airdrop"}
              </Badge>
            ) : null}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "score",
    header: "Score",
    size: 10,
    cell: ({ row }) => {
      const score = row.original.score;
      const subscribe = row.original.subscribe;
      const payment = row.original?.payment;
      return (
        <>
          {subscribe ? (
            <div>{score.toFixed(0)}</div>
          ) : (
            <SubscribeLock payment={payment} />
          )}
        </>
      );
    },
  },
];
