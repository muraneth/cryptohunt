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
      const tags = row.original.tags;
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
            {tags?.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="dark:bg-[#162312] text-[#49aa19] my-0.5"
              >
                {tag}
              </Badge>
            ))}
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

export const topHashTagColumns: ColumnDef<topTag>[] = [
  {
    id: "index",
    header: "#",
    size: 10,
    cell: ({ row, table }) => (
      <div>{table?.getSortedRowModel()?.flatRows?.indexOf(row) + 1}</div>
    ),
  },
  {
    accessorKey: "tag",
    header: "Tag",
    size: 100,
    cell: ({ row }) => {
      const tag = row.original.tag || row.original.id;
      return (
        <Link href={`https://twitter.com/search?q=%23${tag}`} target={"_blank"}>
          <span className="break-all capitalize text-right">
            {tag?.length > 20 ? tag?.slice(0, 20) + "..." : tag}
          </span>
        </Link>
      );
    },
  },
  {
    accessorKey: "score1d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score 1D" />
    ),
    size: 10,
    cell: ({ row }) => <div>{row.original.score1d.toFixed(0)}</div>,
  },
  {
    accessorKey: "score2d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score 2D" />
    ),
    size: 10,
    cell: ({ row }) => <div>{row.original.score2d.toFixed(0)}</div>,
  },
  {
    accessorKey: "score7d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score 7D" />
    ),
    size: 10,
    cell: ({ row }) => <div>{row.original.score7d.toFixed(0)}</div>,
  },
  // {
  //   accessorKey: "score14d",
  //   header: "Score 14D",
  //   size: 20,
  //   cell: ({ row }) => <div>{row.original.score14d.toFixed(0)}</div>,
  // },
  // {
  //   accessorKey: "score30d",
  //   header: "Score 30D",
  //   size: 20,
  //   cell: ({ row }) => <div>{row.original.score30d.toFixed(0)}</div>,
  // },
];

export const topCashTagColumns: ColumnDef<topTag>[] = [
  {
    id: "index",
    header: "#",
    size: 10,
    cell: ({ row, table }) => (
      <div>{table?.getSortedRowModel()?.flatRows?.indexOf(row) + 1}</div>
    ),
  },
  {
    accessorKey: "tag",
    header: "Symbol",
    size: 100,
    cell: ({ row }) => {
      const tag = row.original.tag || row.original.id;
      const price = row.original.price;
      return (
        <Link href={`https://twitter.com/search?q=%24${tag}`} target={"_blank"}>
          <div className="flex space-x-2 items-center">
            <Avatar className="h-6 w-6">
              <AvatarImage src={price?.image} alt={tag} />
              <AvatarFallback>{""}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5">
              {price?.name && (
                <span className="font-medium text-muted-foreground">
                  {price.name}
                </span>
              )}
              <span className="font-medium">{tag.toUpperCase()}</span>
            </div>
          </div>
        </Link>
      );
    },
  },
  {
    id: "price",
    header: "Price",
    size: 50,
    cell: ({ row }) => {
      const price = row.original.price;
      return (
        <div className="font-medium">
          {price?.current_price ? (
            <span>{`$ ${price.current_price}`}</span>
          ) : (
            <span>{`$ 0`}</span>
          )}
        </div>
      );
    },
  },
  {
    id: "priceChange1d",
    header: "Change(1D)",
    size: 50,
    cell: ({ row }) => {
      const price = row.original.price;
      const sign = (price?.price_change_percentage_24h_in_currency ?? -1) >= 0;
      const priceChange = (
        price?.price_change_percentage_24h_in_currency ?? 0
      ).toFixed(2);
      return (
        <div>
          {price?.price_change_percentage_24h_in_currency ? (
            <span
              className={cn(sign ? "text-green-500" : "text-red-500")}
            >{`${priceChange}%`}</span>
          ) : (
            <span className="text-red-800">{`0%`}</span>
          )}
        </div>
      );
    },
  },
  {
    id: "priceChange7d",
    header: "Change(7D)",
    size: 50,
    cell: ({ row }) => {
      const price = row.original.price;
      const sign = (price?.price_change_percentage_7d_in_currency ?? -1) >= 0;
      const priceChange = (
        price?.price_change_percentage_7d_in_currency ?? 0
      ).toFixed(2);
      return (
        <div>
          {price?.price_change_percentage_7d_in_currency ? (
            <span
              className={cn(sign ? "text-green-500" : "text-red-500")}
            >{`${priceChange}%`}</span>
          ) : (
            <span className="text-red-800">{`0%`}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "score1d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score 1D" />
    ),
    size: 100,
    cell: ({ row }) => <div>{row.original.score1d.toFixed(0)}</div>,
  },
];

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
    header: "Username",
    size: 100,
    cell: ({ row }) => {
      const username = row.original.username;
      const name = row.original.name;
      const avatar = row.original.avatar;
      const subscribe = row.original?.subscribe;
      const payment = row.original?.payment;
      return (
        <>
          {subscribe || row.index >= 5 ? (
            <Link href={`https://twitter.com/${username}`} target={"_blank"}>
              <div className="flex space-x-3 items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatar} alt={username} />
                  <AvatarFallback>{username}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2">
                  <span className="font-medium text-muted-foreground">
                    {name}
                  </span>
                  <span className="font-medium">@{username}</span>
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
    cell: ({ row }) => {
      const subscribe = row.original?.subscribe;
      const payment = row.original?.payment;
      return (
        <>
          {subscribe || row.index >= 5 ? (
            <div>{row.original.score1d.toFixed(0)}</div>
          ) : (
            <SubscribeLock payment={payment} />
          )}
        </>
      );
    },
  },
];

export const newProjectColumns: ColumnDef<newProject>[] = [
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
    header: "Username",
    size: 100,
    cell: ({ row }) => {
      const username = row.original.username;
      const name = row.original.name;
      const avatar = row.original.avatar;
      const subscribe = row.original?.subscribe;
      const payment = row.original?.payment;
      return (
        <>
          {subscribe || row.index >= 5 ? (
            <Link href={`https://twitter.com/${username}`} target={"_blank"}>
              <div className="flex space-x-3 items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatar} alt={username} />
                  <AvatarFallback>{username}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2">
                  <span className="font-medium text-muted-foreground">
                    {name}
                  </span>
                  <span className="font-medium">@{username}</span>
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
    accessorKey: "scoreALL",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Impact Score" />
    ),
    size: 10,
    cell: ({ row }) => {
      const subscribe = row.original?.subscribe;
      const payment = row.original?.payment;
      return (
        <>
          {subscribe || row.index >= 5 ? (
            <div>{row.original.scoreALL.toFixed(0)}</div>
          ) : (
            <SubscribeLock payment={payment} />
          )}
        </>
      );
    },
  },
];
