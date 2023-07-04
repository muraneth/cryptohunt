import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberFormat(num: number): string {
  if (num > 1000000000) {
    return `${(num / 1000000000).toFixed(2)} B`;
  } else if (num > 1000000) {
    return `${(num / 1000000).toFixed(2)} M`;
  } else if (num > 1000) {
    return `${(num / 1000).toFixed(2)} K`;
  } else {
    return num.toLocaleString();
  }
}

export function unEscape(htmlStr: string) {
  htmlStr = htmlStr.replace(/&lt;/g, "<");
  htmlStr = htmlStr.replace(/&gt;/g, ">");
  htmlStr = htmlStr.replace(/&quot;/g, '"');
  htmlStr = htmlStr.replace(/&#39;/g, "'");
  htmlStr = htmlStr.replace(/&amp;/g, "&");
  return htmlStr;
}
