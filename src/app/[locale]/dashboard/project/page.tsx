import * as React from "react";
import Loading from "@/app/[locale]/loading";
import { Suspense } from "react";
import { TopFollowing } from "@/app/[locale]/dashboard/components/top-following";
import { NewProject } from "@/app/[locale]/dashboard/components/new-project";

export default async function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-items-center w-full">
        <Suspense fallback={<Loading />} key={"TopFollowing"}>
          {/*@ts-ignore*/}
          <TopFollowing />
        </Suspense>
        <Suspense fallback={<Loading />} key={"NewProject"}>
          {/*@ts-ignore*/}
          <NewProject />
        </Suspense>
      </div>
    </main>
  );
}
