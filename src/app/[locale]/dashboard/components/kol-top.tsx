import * as React from "react";
import Link from "next-intl/link";
import { DataTable } from "@/app/[locale]/dashboard/components/data-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ColumnDef } from "@tanstack/react-table";

interface TweetFeedDashboardProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  more: string;
  href: string;
  tasks: TData[];
  columns: ColumnDef<TData, TValue>[];
}

export function KolTop<TData, TValue>({
  title,
  more,
  tasks,
  columns,
  href,
  ...props
}: TweetFeedDashboardProps<TData, TValue>) {
  return (
    <div
      className="w-full flex flex-col items-center border rounded-md"
      {...props}
    >
      <div className="w-full flex flex-col items-center border rounded-md">
        <div className="w-full flex justify-between p-4">
          <span>{title}</span>
          <Link href={href}>
            <span className="text-secondary-foreground hover:underline">
              {more}
            </span>
          </Link>
        </div>
        <ScrollArea className="h-[600px] w-full">
          <DataTable data={tasks} columns={columns} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
