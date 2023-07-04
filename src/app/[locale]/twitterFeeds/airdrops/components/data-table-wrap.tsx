"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Check, LucideIcon, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { columns } from "@/app/[locale]/twitterFeeds/tweets/components/columns";
import { DataTable } from "@/app/[locale]/twitterFeeds/tweets/components/data-table";
import { plainOptions } from "@/app/[locale]/dashboard/data/data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { topTweet } from "@/app/[locale]/dashboard/data/schema";

interface DataTableProps {
  columns: ColumnDef<topTweet>[];
  data: topTweet[];
  tagName: string;
  filterCrypto: {
    yes: string;
    no: string;
  };
  needTranslation: boolean;
}

export function DataTableWrap({
  columns,
  data,
  tagName,
  filterCrypto,
  needTranslation = false,
}: DataTableProps) {
  const [airdropRelevant, setAirdropRelevant] = React.useState<boolean>(true);
  const [translation, setTranslation] = React.useState<boolean>(false);
  let tableData = data.filter((_: any) =>
    airdropRelevant ? _?.airdropRelevant ?? false : true
  );
  if (translation) {
    tableData = tableData.map((_: any) => {
      return { ..._, text: _.langChinese };
    });
  }
  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col justify-between space-y-3 md:flex-row md:space-y-0 md:space-x-3">
        <div className="flex flex-col space-y-3 items-start md:flex-row md:space-y-0 md:space-x-3  md:items-center">
          <Select
            onValueChange={(v) => setAirdropRelevant(v === "true")}
            value={airdropRelevant.toString()}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">{filterCrypto.yes}</SelectItem>
              <SelectItem value="false">{filterCrypto.no}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="pr-3 flex items-center space-x-2">
          {needTranslation && (
            <>
              <Switch
                id="translation"
                checked={translation}
                onCheckedChange={setTranslation}
              />
              <Label htmlFor="translation">翻译为中文</Label>
            </>
          )}
        </div>
      </div>
      <ScrollArea className="w-full h-full">
        <DataTable data={tableData} columns={columns} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
