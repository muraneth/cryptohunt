import { siteConfig } from "@/config/site";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="border-t py-0">
      <div className="container flex flex-col items-center justify-center gap-4 h-16 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 cryptohunt.ai. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
