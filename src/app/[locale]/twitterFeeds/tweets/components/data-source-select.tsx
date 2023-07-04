"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next-intl/client";
import { useSearchParams } from "next/navigation";
import qs from "qs";
import React, { useTransition } from "react";

interface DataSourceSelectProps {
  placeholder: string;
  dataSource: string;
  children: React.ReactNode;
}

export default function DataSourceSelect({
  placeholder,
  dataSource,
  children,
  ...props
}: DataSourceSelectProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchParamsStr = qs.parse(searchParams.toString())[dataSource];
  // console.log("searchParamsStr: ", searchParamsStr);
  const [isTransitioning, startTransition] = useTransition();

  function onChange(value: any) {
    startTransition(() => {
      // The `useRouter` hook from `next-intl` automatically
      // considers a potential locale prefix of the pathname.
      const searchParamsObj = qs.parse(searchParams.toString());
      searchParamsObj[dataSource] = value;
      router.replace(`${pathname}?${qs.stringify(searchParamsObj)}`);
      // router.refresh();
    });
  }

  return (
    <Select
      onValueChange={onChange}
      // @ts-ignore
      value={searchParamsStr}
      disabled={isTransitioning}
      {...props}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
}
