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

export const topTweetColumns: ColumnDef<{ summary: string }>[] = [
  {
    id: "index",
    header: "#",
    size: 5,
    cell: ({ row, table }) => (
      <div>{table?.getSortedRowModel()?.flatRows?.indexOf(row) + 1}</div>
    ),
  },
  {
    accessorKey: "summary",
    header: "Summary",
    size: 500,
    cell: ({ row }) => {
      const summary = row.original.summary;
      return (
        <div className="flex flex-col space-y-1">
          <div>
            <span className="text-justify break-words hyphens-auto dark:text-accent-foreground/80 line-clamp-2 pr-2">
              {summary}
              {/*{text.length > 200 ? text.slice(0, 200) + "..." : text}*/}
            </span>
          </div>
        </div>
      );
    },
  },
];
