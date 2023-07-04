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
  const [web3OrCrypto, setWeb3OrCrypto] = React.useState<boolean>(true);
  const [tags, setTags] = React.useState<string[]>([]);
  const [translation, setTranslation] = React.useState<boolean>(false);
  let tableData = data
    .filter((_: any) => (web3OrCrypto ? _?.web3OrCrypto ?? false : true))
    .filter((_: any) =>
      tags.length > 0
        ? _.tags.filter((tag: any) => tags.includes(tag)).length > 0
        : true
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
            onValueChange={(v) => setWeb3OrCrypto(v === "true")}
            value={web3OrCrypto.toString()}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">{filterCrypto.yes}</SelectItem>
              <SelectItem value="false">{filterCrypto.no}</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-10 border-dashed"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                {tagName}
                {tags.length > 0 && (
                  <>
                    <Separator orientation="vertical" className="mx-2 h-4" />
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal lg:hidden"
                    >
                      {tags.length}
                    </Badge>
                    <div className="hidden space-x-1 lg:flex">
                      {tags.length > 2 ? (
                        <Badge
                          variant="secondary"
                          className="rounded-sm px-1 font-normal"
                        >
                          {tags.length} selected
                        </Badge>
                      ) : (
                        tags.map((tag) => (
                          <Badge
                            variant="secondary"
                            key={tag}
                            className="rounded-sm px-1 font-normal"
                          >
                            {tag}
                          </Badge>
                        ))
                      )}
                    </div>
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder={"choose tag"} />
                <CommandList>
                  <ScrollArea className="h-[300px] w-full">
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {plainOptions.map((tag) => {
                        const isSelected = tags.includes(tag);
                        return (
                          <CommandItem
                            key={tag}
                            onSelect={() => {
                              if (isSelected) {
                                setTags([...tags.filter((_) => _ !== tag)]);
                              } else {
                                setTags([...tags, tag]);
                              }
                            }}
                          >
                            <div
                              className={cn(
                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "opacity-50 [&_svg]:invisible"
                              )}
                            >
                              <Check className={cn("h-4 w-4")} />
                            </div>
                            <span>{tag}</span>

                            <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                              {data.filter((_) => _.tags?.includes(tag)).length}
                            </span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                    {tags.length > 0 && (
                      <>
                        <CommandSeparator />
                        <CommandGroup>
                          <CommandItem
                            onSelect={() => setTags([])}
                            className="justify-center text-center"
                          >
                            Clear filters
                          </CommandItem>
                        </CommandGroup>
                      </>
                    )}
                    {/*<ScrollBar orientation="horizontal" />*/}
                  </ScrollArea>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
