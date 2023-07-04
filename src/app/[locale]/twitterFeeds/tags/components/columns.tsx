"use client";

import { ColumnDef } from "@tanstack/react-table";
import { topTag, topTweet } from "@/app/[locale]/dashboard/data/schema";
import Link from "next/link";
import { DataTableColumnHeader } from "@/app/[locale]/dashboard/components/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import * as React from "react";

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
    accessorKey: "score3d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score 3D" />
    ),
    size: 10,
    cell: ({ row }) => <div>{row.original.score3d.toFixed(0)}</div>,
  },
  {
    accessorKey: "score5d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score 5D" />
    ),
    size: 10,
    cell: ({ row }) => <div>{row.original.score5d.toFixed(0)}</div>,
  },
  {
    accessorKey: "score7d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score 7D" />
    ),
    size: 10,
    cell: ({ row }) => <div>{row.original.score7d.toFixed(0)}</div>,
  },
  {
    accessorKey: "score14d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score 14D" />
    ),
    size: 10,
    cell: ({ row }) => <div>{row.original.score14d.toFixed(0)}</div>,
  },
  {
    accessorKey: "score30d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score 30D" />
    ),
    size: 10,
    cell: ({ row }) => <div>{row.original.score30d.toFixed(0)}</div>,
  },
];

export const topCashTagColumns: ColumnDef<topTag>[] = [
  {
    id: "index",
    header: "#",
    size: 10,
    cell: ({ row }) => <div>{row.index + 1}</div>,
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
  {
    accessorKey: "score14d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score 14D" />
    ),
    size: 10,
    cell: ({ row }) => <div>{row.original.score14d.toFixed(0)}</div>,
  },
  {
    accessorKey: "score30d",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Score 30D" />
    ),
    size: 10,
    cell: ({ row }) => <div>{row.original.score30d.toFixed(0)}</div>,
  },
];
