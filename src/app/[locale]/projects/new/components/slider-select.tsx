"use client";

import { usePathname, useRouter } from "next-intl/client";
import { useSearchParams } from "next/navigation";
import qs from "qs";
import React, { useTransition } from "react";
import { Slider } from "@/components/ui/slider";

interface SliderSelectProps {
  label: string;
  dataSource: string;
  maxRange: number;
  stepRange: number;
  defaultRange: number;
}

export default function SliderSelect({
  label,
  dataSource,
  maxRange,
  stepRange,
  defaultRange,
  ...props
}: SliderSelectProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchParamsStr = qs.parse(searchParams.toString())[dataSource];
  // console.log("searchParamsStr: ", searchParamsStr);
  const [isTransitioning, startTransition] = useTransition();

  const [value, setValue] = React.useState([
    // @ts-ignore
    searchParamsStr ? parseInt(searchParamsStr) : defaultRange,
  ]);

  function onChange(value: any) {
    setValue(value);
    startTransition(() => {
      // The `useRouter` hook from `next-intl` automatically
      // considers a potential locale prefix of the pathname.
      const searchParamsObj = qs.parse(searchParams.toString());
      console.log("value: ", value);
      console.log("searchParamsObj: ", searchParamsObj);
      searchParamsObj[dataSource] = value[0];
      router.replace(`${pathname}?${qs.stringify(searchParamsObj)}`);
      // router.refresh();
    });
  }

  return (
    // <Select
    //   onValueChange={onChange}
    //   // @ts-ignore
    //   value={searchParamsStr}
    //   disabled={isTransitioning}
    //   {...props}
    // >
    //   <SelectTrigger className="w-[180px]">
    //     <SelectValue placeholder={placeholder} />
    //   </SelectTrigger>
    //   <SelectContent>{children}</SelectContent>
    // </Select>

    <div className="flex flex-col space-y-2 mx-2 w-[360px]">
      {/*<Label*/}
      {/*  htmlFor={`slider_${dataSource}`}*/}
      {/*>{`${label}: ${value?.[0] ?? ""}`}</Label>*/}
      <div className="flex space-x-3 items-center justify-between">
        <span>{label}</span>
        <span className="md:pr-3">{value?.[0] ?? ""}</span>
      </div>
      <Slider
        // id={`slider_${dataSource}`}
        max={maxRange}
        // @ts-ignore
        defaultValue={[value?.[0] ?? ""]}
        // disabled={isTransitioning}
        step={stepRange}
        onValueChange={onChange}
        className="h-4"
        // aria-label={`slider_${dataSource}`}
      />
    </div>
  );
}
