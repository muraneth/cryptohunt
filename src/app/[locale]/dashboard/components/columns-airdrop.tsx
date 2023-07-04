"use client";

import { ColumnDef } from "@tanstack/react-table";
import { newProject, topTag, topTweet, topTwitterUser } from "../data/schema";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { DataTableColumnHeader } from "@/app/[locale]/dashboard/components/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SubscribeLock } from "@/components/subscribe-lock";
import * as React from "react";

export const topTweetColumns: ColumnDef<topTweet>[] = [
  {
    id: "index",
    header: "#",
    size: 5,
    cell: ({ row, table }) => (
      <div>{table?.getSortedRowModel()?.flatRows?.indexOf(row) + 1}</div>
    ),
  },
  {
    accessorKey: "text",
    header: "Tweet",
    size: 500,
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
            <div className="flex flex-col space-y-2 xl:flex-row xl:space-y-0 xl:space-x-2">
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
            <div>
              <span className="text-justify break-words hyphens-auto dark:text-accent-foreground/50 line-clamp-2">
                {text}
                {/*{text.length > 200 ? text.slice(0, 200) + "..." : text}*/}
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
