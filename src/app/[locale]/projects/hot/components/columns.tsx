"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  topTag,
  topTweet,
  topTwitterUser,
} from "@/app/[locale]/dashboard/data/schema";
import Link from "next/link";
import { DataTableColumnHeader } from "@/app/[locale]/dashboard/components/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import moment from "moment/moment";
import { SubscribeLock } from "@/components/subscribe-lock";
import {
  plainOptions,
  projectClassification,
} from "@/app/[locale]/dashboard/data/data";
import * as React from "react";
import { DataTableFacetedFilter } from "@/app/[locale]/projects/hot/components/data-table-faceted-filter";
// import {ProjectClassification} from "@/app/[locale]/projects/hot/components/project-classification";

export const topTwitterUserColumns: ColumnDef<topTwitterUser>[] = [
  {
    id: "index",
    header: "#",
    size: 10,
    cell: ({ row, table }) => (
      <div>{table?.getSortedRowModel()?.flatRows?.indexOf(row) + 1}</div>
    ),
  },
  {
    accessorKey: "username",
    header: ({ column, table }) => (
      <div className="flex flex-row space-x-2 items-center">
        <span>Username</span>
        <DataTableFacetedFilter
          column={table.getColumn("classification")}
          title="classification"
          options={projectClassification}
        />
      </div>
    ),
    // header: "Username",
    size: 100,
    cell: ({ row, table }) => {
      const username = row.original.username;
      const name = row.original.name;
      const avatar = row.original.avatar;
      const description = row.original.description;
      const url = row.original.url;
      const subscribe = row.original?.subscribe;
      const payment = row.original?.payment;
      return (
        <>
          {subscribe || username !== "***" ? (
            <Link href={`https://twitter.com/${username}`} target={"_blank"}>
              <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-3 lg:items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatar} alt={username} />
                  <AvatarFallback>{username}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-3 lg:items-center">
                    <span className="font-medium text-blue-500">{name}</span>
                    <span className="font-medium">@{username}</span>
                  </div>
                  <div className="font-normal text-muted-foreground max-w-[20vw] line-clamp-4">
                    {description}
                  </div>
                  {url && (
                    <div className="font-normal text-primary/50">{url}</div>
                  )}
                </div>
              </div>
            </Link>
          ) : (
            <SubscribeLock payment={payment} />
          )}
        </>
      );
    },
  },
  {
    accessorKey: "classification",
    header: "classification",
    size: 20,
    cell: ({ row }) => {
      return <div>{row.original.classification}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "followersCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Followers" />
    ),
    size: 20,
    cell: ({ row }) => {
      // const subscribe = row.original?.subscribe;
      // const payment = row.original?.payment;

      return <div>{row.original.followersCount.toFixed(0)}</div>;
    },
  },
  {
    accessorKey: "createTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreateTime" />
    ),
    size: 20,
    cell: ({ row }) => {
      // const subscribe = row.original?.subscribe;
      // const payment = row.original?.payment;
      return <div>{moment(row.original.createTime).format("YYYY-MM-DD")}</div>;
    },
  },
  {
    accessorKey: "score1d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trending Score" />
    ),
    size: 10,
    cell: ({ row, table }) => {
      const subscribe = row.original?.subscribe;
      const payment = row.original?.payment;
      const score = row.original.score1d;
      return (
        <>
          {subscribe || score > 0 ? (
            <div>{score.toFixed(0)}</div>
          ) : (
            <SubscribeLock payment={payment} />
          )}
        </>
      );
    },
  },
];
