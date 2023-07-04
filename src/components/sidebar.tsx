import { Gauge, FolderLock, Stamp, Landmark } from "lucide-react";

import { cn } from "@/lib/utils";
import React from "react";
import { useTranslations } from "next-intl";
import { SidebarLinkButton } from "@/components/sidebar-link-button";
import { Icons } from "@/components/icons";

const sidebarLinks: any = {
  dashboard: {
    icon: Gauge,
    routes: [
      {
        name: "twitterFeed",
        href: "/dashboard/twitterFeed",
        label: "Hot",
      },
      {
        name: "tweetSummary",
        href: "/dashboard/tweetSummary",
        label: "Hot",
      },
      {
        name: "project",
        href: "/dashboard/project",
        label: "Hot",
      },
      // {
      //   name: "nft",
      //   href: "/dashboard/nft",
      //   label: "Hot",
      // },
      // {
      //   name: "tvl",
      //   href: "/dashboard/tvl",
      //   label: "Hot",
      // },
    ],
  },
  twitterFeed: {
    icon: Icons.twitter,
    routes: [
      {
        name: "topTweets",
        href: "/twitterFeeds/tweets",
        label: "New",
      },
      {
        name: "topAirdrops",
        href: "/twitterFeeds/airdrops",
        label: "New",
      },
      {
        name: "topTags",
        href: "/twitterFeeds/tags",
        label: "New",
      },
    ],
  },
  project: {
    icon: FolderLock,
    routes: [
      {
        name: "hotProjects",
        href: "/projects/hot",
        label: "New",
      },
      {
        name: "newProjects",
        href: "/projects/new",
        label: "New",
      },
    ],
  },
  // nft: {
  //   icon: Stamp,
  //   routes: [
  //     {
  //       name: "hotNFT",
  //       href: "/nft/nft",
  //       label: "New",
  //     },
  //   ],
  // },
  // tvl: {
  //   icon: Landmark,
  //   routes: [
  //     {
  //       name: "tvlProject",
  //       href: "/tvl/tvlProject",
  //       label: "New",
  //     },
  //     {
  //       name: "tvlChain",
  //       href: "/tvl/tvlChain",
  //       label: "New",
  //     },
  //     {
  //       name: "tvlLayer2",
  //       href: "/tvl/tvlLayer2",
  //       label: "New",
  //     },
  //   ],
  // },
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const t = useTranslations();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        {Object.keys(sidebarLinks).map((sidebarLinkKey) => {
          const sidebar = sidebarLinks[sidebarLinkKey];
          return (
            <div className="px-4 py-2" key={sidebarLinkKey}>
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight flex justify-start items-center">
                <sidebar.icon className="mr-2 h-4 w-4" />
                {/*@ts-ignore*/}
                <p>{t(`${sidebarLinkKey}.title`)}</p>
              </h2>
              <div className="space-y-1">
                {sidebarLinks[sidebarLinkKey].routes.map((route: any) => (
                  <SidebarLinkButton
                    key={route.href}
                    href={route.href}
                    // @ts-ignore
                    name={t(`${sidebarLinkKey}.${route.name}`)}
                    label={route.label}
                  />
                ))}
              </div>
            </div>
          );
        })}
        {/*<div className="px-4 py-2">*/}
        {/*  <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight flex justify-start items-center">*/}
        {/*    <Gauge className="mr-2 h-4 w-4" />*/}
        {/*    <p>{t("dashboard.title")}</p>*/}
        {/*  </h2>*/}
        {/*  <div className="space-y-1">*/}
        {/*    {sidebarLinks.dashboard.map((dashboard) => (*/}
        {/*      <SidebarLinkButton*/}
        {/*        key={dashboard.href}*/}
        {/*        href={dashboard.href}*/}
        {/*        name={t(`dashboard.${dashboard.name}`)}*/}
        {/*        label={dashboard.label}*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="px-4 py-2">*/}
        {/*  <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight flex justify-start items-center">*/}
        {/*    <Icons.twitter className="mr-2 h-4 w-4 fill-current" />*/}
        {/*    <p>{t("twitterFeed.title")}</p>*/}
        {/*  </h2>*/}
        {/*  <div className="space-y-1">*/}
        {/*    {sidebarLinks.twitterFeed.map((twitterFeed) => (*/}
        {/*      <SidebarLinkButton*/}
        {/*        key={twitterFeed.href}*/}
        {/*        href={twitterFeed.href}*/}
        {/*        name={t(`twitterFeed.${twitterFeed.name}`)}*/}
        {/*        label={twitterFeed.label}*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="px-4 py-2">*/}
        {/*  <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight flex justify-start items-center">*/}
        {/*    <Icons.twitter className="mr-2 h-4 w-4 fill-current" />*/}
        {/*    <p>{t("project.title")}</p>*/}
        {/*  </h2>*/}
        {/*  <div className="space-y-1">*/}
        {/*    {sidebarLinks.project.map((project) => (*/}
        {/*        <SidebarLinkButton*/}
        {/*            key={project.href}*/}
        {/*            href={project.href}*/}
        {/*            name={t(`project.${project.name}`)}*/}
        {/*            label={project.label}*/}
        {/*        />*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="px-4 py-2">*/}
        {/*  <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight flex justify-start items-center">*/}
        {/*    <Icons.twitter className="mr-2 h-4 w-4 fill-current" />*/}
        {/*    <p>{t("tvl.title")}</p>*/}
        {/*  </h2>*/}
        {/*  <div className="space-y-1">*/}
        {/*    {sidebarLinks.tvl.map((tvl) => (*/}
        {/*        <SidebarLinkButton*/}
        {/*            key={tvl.href}*/}
        {/*            href={tvl.href}*/}
        {/*            name={t(`tvl.${tvl.name}`)}*/}
        {/*            label={tvl.label}*/}
        {/*        />*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
