import Link from "next-intl/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
// import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons";
import { ModeToggle } from "@/components/mode-toggle";
import { CreditCard, SidebarOpen } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import React from "react";
import { LangToggle } from "@/components/lang-toggle";
import { UserNav } from "@/components/user-nav";
import { useTranslations } from "next-intl";
import { Payment } from "@/components/payment";
import { HeaderPriceGasTrack } from "@/components/header-price-gas-track";

export function SiteHeader() {
  const t = useTranslations("payment");
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur pl-3 pr-3 md:pl-12 pr-4">
      <div className="flex h-14 items-center">
        {/*<Sheet open={open} onOpenChange={setOpen}>*/}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="px-0 mr-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden md:pr-0"
            >
              <SidebarOpen className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent size="xl" position="left" className="pr-0 sm:w-1/2">
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-5">
                <Sidebar />
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center space-x-2">
          <div
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "ghost",
              }),
              "w-12 h-12 px-0 hover:bg-background"
            )}
          >
            <Icons.cryptoHunt className="h-auto fill-current" />
            {/*<span>CryptoHunt</span>*/}
            <span className="sr-only">logo</span>
          </div>
        </Link>
        <HeaderPriceGasTrack />
        <div className="mr-3 flex flex-1 items-center space-x-2 sm:space-x-4 justify-end">
          {/*<div className="w-full flex-1 md:w-auto md:flex-none">*/}
          {/*  <CommandMenu />*/}
          {/*</div>*/}
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.telegram}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  }),
                  "w-9 px-0"
                )}
              >
                <Icons.telegram className="h-9 w-9 fill-current pt-0.5" />
                <span className="sr-only">Telegram</span>
              </div>
            </Link>
            <LangToggle />
            <ModeToggle />
          </nav>
        </div>
        <UserNav>
          <Payment
            title={t("title")}
            introduction={t("introduction")}
            includeItems={t("includeItems")}
            paymentList={t("paymentList")}
          >
            <Button
              variant="ghost"
              className="w-full flex justify-start px-2 py-1.5 h-8"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Subscribe</span>
            </Button>
          </Payment>
        </UserNav>
      </div>
    </header>
  );
}
