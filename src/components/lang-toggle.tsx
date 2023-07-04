"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { Globe } from "lucide-react";
import Link from "next-intl/link";
import { usePathname, useRouter } from "next-intl/client";

export function LangToggle() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 px-0">
          <Globe />
          <span className="sr-only">Toggle lang</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={pathname} locale="en-US">
          <DropdownMenuItem>
            <span>English</span>
          </DropdownMenuItem>
        </Link>
        <Link href={pathname} locale="zh-CN">
          <DropdownMenuItem>
            <span>中文</span>
          </DropdownMenuItem>
        </Link>

        {/*<DropdownMenuItem onClick={() => setTheme("system")}>*/}
        {/*  <Icons.laptop className="mr-2 h-4 w-4" />*/}
        {/*  <span>System</span>*/}
        {/*</DropdownMenuItem>*/}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
