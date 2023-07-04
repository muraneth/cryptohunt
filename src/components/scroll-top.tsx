"use client";

import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollTop() {
  return (
    <div className="fixed bottom-10 right-10 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-800 p-3 font-mono text-xs text-white">
      <Button onClick={() => window.scrollTo(0, 0)} size="sm" variant="ghost">
        <div className="block">
          <ChevronUp />
        </div>
      </Button>
    </div>
  );
}
