import { Icons } from "@/components/icons";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <Icons.spinner className="m-5 mx-2 h-4 w-4 animate-spin" />;
}
