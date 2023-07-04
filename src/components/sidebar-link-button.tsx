"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next-intl/link";
import React from "react";
import { usePathname } from "next-intl/client";
import { Flame, Gauge } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLLinkElement> {
  href: string;
  name: string;
  label?: string;
}

export function SidebarLinkButton({
  className,
  href,
  name,
  label,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <Link href={href} className={cn("flex items-center space-x-2 ml-5")}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "w-full justify-start",
          pathname?.startsWith(href) ? "bg-secondary" : null
        )}
      >
        <p>{name}</p>
        {label === "New" ? (
          <p className="w-0 lg:w-auto mx-2 text-red-500">new</p>
        ) : label === "Hot" ? (
          <Flame className="w-0 h-0 lg:mx-2 lg:h-4 lg:w-4 fill-red-500 stroke-red-500" />
        ) : null}
      </Button>
    </Link>
  );
}
