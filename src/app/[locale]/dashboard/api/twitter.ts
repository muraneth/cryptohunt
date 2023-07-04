import {
  newProject,
  newProjectSchema,
  topMedia,
  topMediaSchema,
  topTag,
  topTagSchema,
  topTweet,
  topTweetSchema,
  topTwitterUser,
  topTwitterUserSchema,
} from "@/app/[locale]/dashboard/data/schema";
import { plainOptions } from "@/app/[locale]/dashboard/data/data";
import { z } from "zod";
import { unEscape } from "@/lib/utils";

export async function getKolTop(
  group: string,
  recentHours: string,
  isThread: boolean
): Promise<topTweet[]> {
  const data = [
    {
      id: "1676024844641550337",
      text: "Earn Update: An Open Letter to @BarrySilbert https://t.co/ErsYpcEjQD",
      createTime: "2023-07-04T00:27:16.000Z",
      createdAt: "2023-07-04T09:02:49.623Z",
      updatedAt: "2023-07-04T13:02:54.010Z",
      checkedNotThread: false,
      twitterUserId: "250980843",
      quoteId: null,
      classification:
        "1. Yes\n2. No\n3. Yes\n4. No\n5. No\n6. No\n7. No\n8. No\n9. No",
      langChinese: "Earn更新：一封致@BarrySilbert的公开信",
      airdropTag: null,
      retweetUsersAddSyncTime: null,
      retweetUsersSetSyncTime: null,
      retweetCount: 344,
      replyCount: 202,
      likeCount: 1712,
      quoteCount: 149,
      twitterUser: {
        id: "250980843",
        name: "Cameron Winklevoss",
        username: "cameron",
      },
      score: 1255.9931600600426,
      kolGroup: "all",
      kolRetweetCount: 7,
      kolReplyCount: 1,
      kolLikeCount: 20,
      kolQuoteCount: 5,
    },
    {
      id: "1675971967441043459",
      text: "What the fuck?!\n\n@elonmusk you ass-clown.\n\nOh “hurr durr freedom of speech” unless you don’t like walls of text.\n\nThread engagement drives exponentially more views than long form posts, due to the ability to share quoteable chunks.\n\nHence more ad rev for your dying business.",
      createTime: "2023-07-03T20:57:09.000Z",
      createdAt: "2023-07-04T09:06:36.504Z",
      updatedAt: "2023-07-04T13:12:47.378Z",
      checkedNotThread: false,
      twitterUserId: "116328126",
      quoteId: null,
      classification:
        "1. No\n2. No\n3. No\n4. No\n5. No\n6. No\n7. No\n8. No\n9. No",
      langChinese:
        "你他妈的是个什么东西？！\n@elonmusk 你这个混蛋。\n哦，“呼呼自由言论”，除非你不喜欢长篇大论。\n线程互动比长篇文章能带来指数级的浏览量，因为可以分享引用的片段。\n因此，对于你这个濒临破产的生意来说，能带来更多广告收入。",
      airdropTag: null,
      retweetUsersAddSyncTime: null,
      retweetUsersSetSyncTime: null,
      retweetCount: 71,
      replyCount: 238,
      likeCount: 1111,
      quoteCount: 93,
      twitterUser: {
        id: "116328126",
        name: "Adam Cochran (adamscochran.eth)",
        username: "adamscochran",
      },
      score: 820.642542766825,
      kolGroup: "all",
      kolRetweetCount: 2,
      kolReplyCount: 5,
      kolLikeCount: 19,
      kolQuoteCount: 2,
    },
    {
      id: "1676038497461846018",
      text: 'Meet a cute girl on my bike ride today.\n\nShe asks for my instagram and sends a message so I can follow back later.\n\nGet home, no message.\n\nRealize she clicked on an impersonator account who is now likely asking her: "how is your BTC trading going?"\n\nI may never recover from this.',
      createTime: "2023-07-04T01:21:31.000Z",
      createdAt: "2023-07-04T09:22:39.818Z",
      updatedAt: "2023-07-04T14:08:06.588Z",
      checkedNotThread: false,
      twitterUserId: "877728873340956672",
      quoteId: null,
      classification:
        "1. No\n2. No\n3. No\n4. No\n5. No\n6. No\n7. No\n8. No\n9. No",
      langChinese:
        "今天骑自行车时遇到了一个可爱的女孩。\n\n她要求我的Instagram，并发送了一条消息，以便我稍后关注她。\n\n回到家，没有收到消息。\n\n意识到她点击了一个冒充账号，现在很可能有人问她：“你的比特币交易怎么样了？”\n\n我可能永远无法从中恢复过来。",
      airdropTag: null,
      retweetUsersAddSyncTime: null,
      retweetUsersSetSyncTime: null,
      retweetCount: 8,
      replyCount: 108,
      likeCount: 742,
      quoteCount: 1,
      twitterUser: {
        id: "877728873340956672",
        name: "Luke Martin",
        username: "VentureCoinist",
      },
      score: 512.2420570969424,
      kolGroup: "all",
      kolRetweetCount: 0,
      kolReplyCount: 2,
      kolLikeCount: 26,
      kolQuoteCount: 0,
    },
    {
      id: "1676018291918372864",
      text: "All your Threads are belong to us https://t.co/FfrIcUng5O https://t.co/V7xbMOfINt",
      createTime: "2023-07-04T00:01:14.000Z",
      createdAt: "2023-07-04T09:00:45.851Z",
      updatedAt: "2023-07-04T13:50:27.611Z",
      checkedNotThread: false,
      twitterUserId: "12",
      quoteId: null,
      classification:
        "1. No\n2. No\n3. No\n4. No\n5. No\n6. No\n7. No\n8. No\n9. No",
      langChinese: "所有你的帖子都属于我们",
      airdropTag: null,
      retweetUsersAddSyncTime: null,
      retweetUsersSetSyncTime: null,
      retweetCount: 3850,
      replyCount: 1547,
      likeCount: 18715,
      quoteCount: 1333,
      twitterUser: {
        id: "12",
        name: "jack",
        username: "jack",
      },
      score: 505.95633697128324,
      kolGroup: "all",
      kolRetweetCount: 2,
      kolReplyCount: 3,
      kolLikeCount: 13,
      kolQuoteCount: 1,
    },
    {
      id: "1675968930228355072",
      text: "Twitter Threads R.I.P. ? \n\nSeems Twitter has implemented a new 25 tweets limit per thread.",
      createTime: "2023-07-03T20:45:05.000Z",
      createdAt: "2023-07-04T09:06:36.501Z",
      updatedAt: "2023-07-04T14:18:16.632Z",
      checkedNotThread: false,
      twitterUserId: "534493783",
      quoteId: null,
      classification:
        "1. No\n2. No\n3. No\n4. No\n5. No\n6. No\n7. No\n8. No\n9. No",
      langChinese:
        "Twitter线程R.I.P.？\n\n看起来Twitter已经实施了每个线程25条推文的新限制。",
      airdropTag: null,
      retweetUsersAddSyncTime: null,
      retweetUsersSetSyncTime: null,
      retweetCount: 27,
      replyCount: 89,
      likeCount: 261,
      quoteCount: 91,
      twitterUser: {
        id: "534493783",
        name: "Alex Krüger",
        username: "krugermacro",
      },
      score: 475.1515541248886,
      kolGroup: "all",
      kolRetweetCount: 0,
      kolReplyCount: 4,
      kolLikeCount: 3,
      kolQuoteCount: 3,
    },
  ];
  const originData = z.array(topTweetSchema).parse(data);

  const result = z.array(topTweetSchema).parse(
    originData.map((_) => {
      const tags: string[] = [];
      const tagsAlpha: string[] = [];
      let web3OrCrypto = null;
      let airdropRelevant = false;
      if (_.classification) {
        const tagList = _.classification.split("\n");
        web3OrCrypto = tagList[0]?.toLowerCase().indexOf("yes") > -1;
        if (web3OrCrypto) {
          for (let i = 0; i < plainOptions.length; i++) {
            if (
              tagList[i + 1] &&
              tagList[i + 1].toLowerCase().indexOf("yes") > -1
            ) {
              tags.push(plainOptions[i]);
            }
          }
          // for (
          //   let i = plainOptions.length;
          //   i < plainOptions.length + plainOptionsAlpha.length;
          //   i++
          // ) {
          //   if (
          //     tagList[i + 1] &&
          //     tagList[i + 1].toLowerCase().indexOf("yes") > -1
          //   ) {
          //     tagsAlpha.push(plainOptionsAlpha[i - plainOptions.length]);
          //   }
          // }
        }
      }
      if (_.airdropTag) {
        if (
          _.airdropTag?.toLowerCase().includes("yes") ||
          _.airdropTag?.toLowerCase().includes("高") ||
          _.airdropTag?.toLowerCase().includes("中")
        ) {
          airdropRelevant = true;
        }
      }
      return {
        ..._,
        text: unEscape(_.text),
        langChinese: unEscape(_.langChinese ?? ""),
        web3OrCrypto: web3OrCrypto,
        tags: tags,
        tagsAlpha: tagsAlpha,
        airdropRelevant: airdropRelevant,
        subscribe: true,
      };
    })
  );
  return result;
}

export async function getKolTweetSummary(
  group: string,
  recentHours: string,
  isThread: boolean
): Promise<{ summary: string }[]> {
  const originData: string =
    "- Bird Scooters' valuation has dropped from $2.8B to $25M after raising $700M in venture capital.\n- Founder and CEO Travis VanderZanden has left the company.\n- A special purpose acquisition company (SPAC) valued Bird Scooters at $2.3B in November 2021.\n- NFTs are being compared to alt-coins in this market cycle, with liquidity shifting away as the excess ends.\n- The belief that Ethereum, Solana, L2s, DeFi, and stablecoins emerged from the excess of the ICO boom is considered accurate but premature.\n- BlackRock has re-filed for a spot bitcoin ETF, following the footsteps of Coinbase.\n- A company has successfully characterized inflation to be just over 2%, which challenges the government's CPI data manipulation claims.\n- Maps are an underexplored primitive for new social experiences.\n- Over 690 artists have submitted pieces for a fundraiser, and the MOCA team is working on showcasing everyone's contributions.\n- The concept of yETH bootstrapping and how protocols and depositors can incentivize better rewards with less centralization risk is explained in a thread.";

  const result = originData
    .replace(/-\s/g, "")
    .split("\n")
    .map((_) => {
      return { summary: _ };
    });
  return result;
}

export async function getKolTopHashtags(
  group = "all",
  daysOffset = "1"
): Promise<topTag[]> {
  const data = [
    {
      id: "bitcoin",
      type: "hashtags",
      tag: "Bitcoin",
      createdAt: "2023-04-26T14:39:47.742Z",
      updatedAt: "2023-07-04T12:22:41.861Z",
      score1d: 121,
      kolCount1d: 3,
      score2d: 262,
      kolCount2d: 7,
      score3d: 289,
      kolCount3d: 8,
      score5d: 526,
      kolCount5d: 20,
      score7d: 1097,
      kolCount7d: 46,
      score14d: 4436,
      kolCount14d: 197,
      score30d: 6919,
      kolCount30d: 312,
    },
    {
      id: "oracle",
      type: "hashtags",
      tag: "Oracle",
      createdAt: "2023-04-27T13:44:59.129Z",
      updatedAt: "2023-07-04T12:24:48.291Z",
      score1d: 116,
      kolCount1d: 3,
      score2d: 116,
      kolCount2d: 3,
      score3d: 116,
      kolCount3d: 3,
      score5d: 116,
      kolCount5d: 3,
      score7d: 116,
      kolCount7d: 3,
      score14d: 159,
      kolCount14d: 5,
      score30d: 175,
      kolCount30d: 6,
    },
    {
      id: "oracleless",
      type: "hashtags",
      tag: "Oracleless",
      createdAt: "2023-07-04T09:47:17.459Z",
      updatedAt: "2023-07-04T12:24:48.293Z",
      score1d: 116,
      kolCount1d: 3,
      score2d: 116,
      kolCount2d: 3,
      score3d: 116,
      kolCount3d: 3,
      score5d: 116,
      kolCount5d: 3,
      score7d: 116,
      kolCount7d: 3,
      score14d: 116,
      kolCount14d: 3,
      score30d: 116,
      kolCount30d: 3,
    },
    {
      id: "byac",
      type: "hashtags",
      tag: "BYAC",
      createdAt: "2023-07-04T09:58:21.543Z",
      updatedAt: "2023-07-04T10:40:10.735Z",
      score1d: 84,
      kolCount1d: 2,
      score2d: 84,
      kolCount2d: 2,
      score3d: 84,
      kolCount3d: 2,
      score5d: 84,
      kolCount5d: 2,
      score7d: 84,
      kolCount7d: 2,
      score14d: 84,
      kolCount14d: 2,
      score30d: 84,
      kolCount30d: 2,
    },
    {
      id: "defi",
      type: "hashtags",
      tag: "DeFi",
      createdAt: "2023-04-26T15:27:49.747Z",
      updatedAt: "2023-07-04T12:14:51.322Z",
      score1d: 74,
      kolCount1d: 2,
      score2d: 111,
      kolCount2d: 3,
      score3d: 111,
      kolCount3d: 3,
      score5d: 330,
      kolCount5d: 15,
      score7d: 635,
      kolCount7d: 32,
      score14d: 1361,
      kolCount14d: 71,
      score30d: 3294,
      kolCount30d: 164,
    },
  ];
  const info = z.array(topTagSchema).parse(data);

  const result =
    info
      ?.sort(
        (a: any, b: any) => b[`score${daysOffset}d`] - a[`score${daysOffset}d`]
      )
      .map((_) => {
        return {
          ..._,
          subscribe: true,
        };
      }) ?? [];
  return result;
}

export async function getKolTopCashtags(
  group = "all",
  daysOffset = "1"
): Promise<topTag[]> {
  const data = [
    {
      id: "mkr",
      type: "cashtags",
      tag: "MKR",
      createdAt: "2023-04-30T21:45:44.569Z",
      updatedAt: "2023-07-04T12:13:49.057Z",
      score1d: 134,
      kolCount1d: 4,
      score2d: 134,
      kolCount2d: 4,
      score3d: 134,
      kolCount3d: 4,
      score5d: 179,
      kolCount5d: 7,
      score7d: 179,
      kolCount7d: 7,
      score14d: 221,
      kolCount14d: 9,
      score30d: 395,
      kolCount30d: 18,
      price: [
        {
          id: "maker",
          symbol: "mkr",
          name: "Maker",
          image:
            "https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png?1585191826",
          current_price: 1012,
          market_cap: 911288480,
          market_cap_rank: 49,
          fully_diluted_valuation: 1016708760,
          total_volume: 99800260,
          high_24h: 1031.38,
          low_24h: 922.15,
          price_change_24h: 79.61,
          price_change_percentage_24h: 8.53815,
          market_cap_change_24h: 71777107,
          market_cap_change_percentage_24h: 8.54987,
          circulating_supply: 901310.9472893132,
          total_supply: 977631.036950888,
          max_supply: 1005577,
          ath: 6292.31,
          ath_change_percentage: -83.9752,
          ath_date: "2021-05-03T21:54:29.333Z",
          atl: 168.36,
          atl_change_percentage: 498.92222,
          atl_date: "2020-03-16T20:52:36.527Z",
          roi: null,
          last_updated: "2023-07-04T14:35:49.446Z",
          price_change_percentage_1h_in_currency: -1.50969263820199,
          price_change_percentage_24h_in_currency: 8.538150658328018,
          price_change_percentage_7d_in_currency: 47.70507239250668,
        },
      ],
    },
    {
      id: "pendle",
      type: "cashtags",
      tag: "pendle",
      createdAt: "2023-04-26T18:45:34.126Z",
      updatedAt: "2023-07-04T12:13:48.772Z",
      score1d: 93,
      kolCount1d: 3,
      score2d: 93,
      kolCount2d: 3,
      score3d: 93,
      kolCount3d: 3,
      score5d: 218,
      kolCount5d: 9,
      score7d: 316,
      kolCount7d: 15,
      score14d: 413,
      kolCount14d: 22,
      score30d: 599,
      kolCount30d: 33,
      price: [],
    },
    {
      id: "eth",
      type: "cashtags",
      tag: "ETH",
      createdAt: "2023-04-26T14:35:57.235Z",
      updatedAt: "2023-07-04T12:22:55.535Z",
      score1d: 83,
      kolCount1d: 2,
      score2d: 209,
      kolCount2d: 7,
      score3d: 258,
      kolCount3d: 10,
      score5d: 817,
      kolCount5d: 37,
      score7d: 1298,
      kolCount7d: 59,
      score14d: 2736,
      kolCount14d: 127,
      score30d: 5635,
      kolCount30d: 263,
      price: [
        {
          id: "ethereum",
          symbol: "eth",
          name: "Ethereum",
          image:
            "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
          current_price: 1958.91,
          market_cap: 235528279087,
          market_cap_rank: 2,
          fully_diluted_valuation: 235528279087,
          total_volume: 7318939330,
          high_24h: 1976.23,
          low_24h: 1948.87,
          price_change_24h: 0.162802,
          price_change_percentage_24h: 0.00831,
          market_cap_change_24h: -358300982.7868347,
          market_cap_change_percentage_24h: -0.1519,
          circulating_supply: 120219082.757286,
          total_supply: 120219082.757286,
          max_supply: null,
          ath: 4878.26,
          ath_change_percentage: -59.8601,
          ath_date: "2021-11-10T14:24:19.604Z",
          atl: 0.432979,
          atl_change_percentage: 452145.7915,
          atl_date: "2015-10-20T00:00:00.000Z",
          roi: {
            times: 83.43424787947504,
            currency: "btc",
            percentage: 8343.424787947504,
          },
          last_updated: "2023-07-04T14:35:47.286Z",
          price_change_percentage_1h_in_currency: 0.06402175282678857,
          price_change_percentage_24h_in_currency: 0.008311547477204067,
          price_change_percentage_7d_in_currency: 4.156622553981455,
        },
      ],
    },
    {
      id: "op",
      type: "cashtags",
      tag: "OP",
      createdAt: "2023-04-26T16:30:24.035Z",
      updatedAt: "2023-07-04T12:22:55.539Z",
      score1d: 69,
      kolCount1d: 2,
      score2d: 94,
      kolCount2d: 4,
      score3d: 94,
      kolCount3d: 4,
      score5d: 107,
      kolCount5d: 5,
      score7d: 183,
      kolCount7d: 10,
      score14d: 441,
      kolCount14d: 22,
      score30d: 992,
      kolCount30d: 49,
      price: [
        {
          id: "optimism",
          symbol: "op",
          name: "Optimism",
          image:
            "https://assets.coingecko.com/coins/images/25244/large/Optimism.png?1660904599",
          current_price: 1.33,
          market_cap: 858464028,
          market_cap_rank: 52,
          fully_diluted_valuation: 5719988790,
          total_volume: 75406283,
          high_24h: 1.37,
          low_24h: 1.32,
          price_change_24h: -0.013277003484730711,
          price_change_percentage_24h: -0.98677,
          market_cap_change_24h: -7186811.819734812,
          market_cap_change_percentage_24h: -0.83022,
          circulating_supply: 644594782,
          total_supply: 4294967296,
          max_supply: 4294967296,
          ath: 3.22,
          ath_change_percentage: -58.73063,
          ath_date: "2023-02-24T20:20:00.509Z",
          atl: 0.402159,
          atl_change_percentage: 230.76198,
          atl_date: "2022-06-18T20:54:52.178Z",
          roi: null,
          last_updated: "2023-07-04T14:35:52.525Z",
          price_change_percentage_1h_in_currency: 0.46417787405131256,
          price_change_percentage_24h_in_currency: -0.986774619870176,
          price_change_percentage_7d_in_currency: 0.07466193003694259,
        },
      ],
    },
    {
      id: "btc",
      type: "cashtags",
      tag: "BTC",
      createdAt: "2023-04-26T14:31:54.362Z",
      updatedAt: "2023-07-04T12:22:41.826Z",
      score1d: 63,
      kolCount1d: 1,
      score2d: 128,
      kolCount2d: 4,
      score3d: 128,
      kolCount3d: 4,
      score5d: 461,
      kolCount5d: 18,
      score7d: 903,
      kolCount7d: 40,
      score14d: 3024,
      kolCount14d: 137,
      score30d: 5408,
      kolCount30d: 251,
      price: [
        {
          id: "bitcoin",
          symbol: "btc",
          name: "Bitcoin",
          image:
            "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
          current_price: 31021,
          market_cap: 602352801727,
          market_cap_rank: 1,
          fully_diluted_valuation: 651370779185,
          total_volume: 11027869473,
          high_24h: 31384,
          low_24h: 30668,
          price_change_24h: 353.28,
          price_change_percentage_24h: 1.15195,
          market_cap_change_24h: 6311414069,
          market_cap_change_percentage_24h: 1.05889,
          circulating_supply: 19419675,
          total_supply: 21000000,
          max_supply: 21000000,
          ath: 69045,
          ath_change_percentage: -55.09268,
          ath_date: "2021-11-10T14:24:11.849Z",
          atl: 67.81,
          atl_change_percentage: 45625.72475,
          atl_date: "2013-07-06T00:00:00.000Z",
          roi: null,
          last_updated: "2023-07-04T14:35:49.096Z",
          price_change_percentage_1h_in_currency: -0.07397062868471177,
          price_change_percentage_24h_in_currency: 1.1519487420890047,
          price_change_percentage_7d_in_currency: 1.3027250281022897,
        },
      ],
    },
  ];
  const info = z.array(topTagSchema).parse(data);

  let result =
    info?.sort(
      (a: any, b: any) => b[`score${daysOffset}d`] - a[`score${daysOffset}d`]
    ) ?? [];
  result = result.map((_) => {
    return {
      ..._,
      price: _?.price?.[0],
      subscribe: true,
    };
  });
  return result;
}

export async function getKolTopFollowing(
  group = "all",
  daysOffset = "1"
): Promise<topTwitterUser[]> {
  const data = [
    {
      id: "1675883225321807874",
      name: "Phoenix",
      username: "PhoenixTrade_",
      createTime: "2023-07-03T15:05:42.000Z",
      avatar:
        "https://pbs.twimg.com/profile_images/1675945923967348736/O_kx2dAe_normal.jpg",
      description:
        "Bringing users the deepest on-chain orderbook liquidity. \nExclusively on @Solana.",
      followersCount: 265,
      location: "",
      url: null,
      score: null,
      classification: "project",
      isCN: false,
      createdAt: "2023-07-04T09:44:20.792Z",
      updatedAt: "2023-07-04T14:18:11.419Z",
      followersAddSyncTime: null,
      followersSetSyncTime: null,
      score1d: 390,
      kolCount1d: 11,
      score2d: 390,
      kolCount2d: 11,
      score3d: 390,
      kolCount3d: 11,
      score5d: 390,
      kolCount5d: 11,
      score7d: 390,
      kolCount7d: 11,
      score14d: 390,
      kolCount14d: 11,
      score30d: 390,
      kolCount30d: 11,
    },
    {
      id: "1675791672691793920",
      name: "Ouroboros Research",
      username: "OuroResearch",
      createTime: "2023-07-03T09:00:48.000Z",
      avatar:
        "https://pbs.twimg.com/profile_images/1675791731286212610/x84oRHB8_normal.jpg",
      description: "",
      followersCount: 534,
      location: "",
      url: null,
      score: null,
      classification: "project",
      isCN: false,
      createdAt: "2023-07-04T09:25:31.045Z",
      updatedAt: "2023-07-04T14:28:19.182Z",
      followersAddSyncTime: null,
      followersSetSyncTime: null,
      score1d: 386,
      kolCount1d: 15,
      score2d: 386,
      kolCount2d: 15,
      score3d: 386,
      kolCount3d: 15,
      score5d: 386,
      kolCount5d: 15,
      score7d: 386,
      kolCount7d: 15,
      score14d: 386,
      kolCount14d: 15,
      score30d: 386,
      kolCount30d: 15,
    },
    {
      id: "1644262399644516354",
      name: "",
      username: "gcicapital",
      createTime: "2023-04-07T08:54:49.000Z",
      avatar: "",
      description:
        "@gcicapital's account is temporarily unavailable because it violates the Twitter Media Policy. Learn more.",
      followersCount: 625,
      location: "",
      url: null,
      score: null,
      classification: "project",
      isCN: false,
      createdAt: "2023-05-08T20:18:05.314Z",
      updatedAt: "2023-07-04T13:50:25.793Z",
      followersAddSyncTime: null,
      followersSetSyncTime: null,
      score1d: 385,
      kolCount1d: 12,
      score2d: 564,
      kolCount2d: 21,
      score3d: 564,
      kolCount3d: 21,
      score5d: 602,
      kolCount5d: 23,
      score7d: 602,
      kolCount7d: 23,
      score14d: 602,
      kolCount14d: 23,
      score30d: 636,
      kolCount30d: 24,
    },
    {
      id: "1658514510569959427",
      name: "zksecurity.xyz",
      username: "zksecurityXYZ",
      createTime: "2023-05-16T16:47:48.000Z",
      avatar:
        "https://pbs.twimg.com/profile_images/1658515259425173504/5qv9ESlm_normal.jpg",
      description:
        "Security audits\nfor zero-knowledge\napplications\nhttps://t.co/6b4Wq7NBk8",
      followersCount: 912,
      location: "",
      url: null,
      score: null,
      classification: "project",
      isCN: false,
      createdAt: "2023-05-31T01:10:59.738Z",
      updatedAt: "2023-07-04T14:33:23.687Z",
      followersAddSyncTime: null,
      followersSetSyncTime: null,
      score1d: 381,
      kolCount1d: 10,
      score2d: 582,
      kolCount2d: 20,
      score3d: 599,
      kolCount3d: 21,
      score5d: 620,
      kolCount5d: 22,
      score7d: 646,
      kolCount7d: 24,
      score14d: 646,
      kolCount14d: 24,
      score30d: 855,
      kolCount30d: 34,
    },
    {
      id: "1419688307529818116",
      name: "All The Right Movies",
      username: "ATRightMovies",
      createTime: "2021-07-26T15:59:01.000Z",
      avatar:
        "https://pbs.twimg.com/profile_images/1437108005611376640/csYpL-HY_normal.jpg",
      description:
        "Twitter's best account on classic and hit films. To support what we do, please subscribe 😁",
      followersCount: 576813,
      location: "UK",
      url: "https://alltherightmovies.com",
      score: null,
      classification: null,
      isCN: false,
      createdAt: "2023-04-25T17:25:05.472Z",
      updatedAt: "2023-07-04T14:25:52.283Z",
      followersAddSyncTime: null,
      followersSetSyncTime: null,
      score1d: 251,
      kolCount1d: 6,
      score2d: 251,
      kolCount2d: 6,
      score3d: 294,
      kolCount3d: 7,
      score5d: 322,
      kolCount5d: 8,
      score7d: 351,
      kolCount7d: 10,
      score14d: 493,
      kolCount14d: 15,
      score30d: 1057,
      kolCount30d: 44,
    },
  ];
  const info = z.array(topTwitterUserSchema).parse(data);
  const tagName = `score${daysOffset}d`;

  const result =
    info
      ?.map((_: any) => {
        return {
          ..._,
          scoreTrack: _[tagName],
          subscribe: true,
        };
      })
      .sort((a: any, b: any) => b.scoreTrack - a.scoreTrack) ?? [];
  return result;
}

export async function getKolAllFollowing(
  group: string,
  creationOffset = "30",
  followerLimit = "10000",
  followerMin = "0"
): Promise<newProject[]> {
  const data = [
    {
      id: "1668221579996569600",
      name: "Frontier Research",
      username: "FrontierDotTech",
      createTime: "2023-06-12T11:40:44.000Z",
      avatar:
        "https://pbs.twimg.com/profile_images/1671164187660406788/ztVffZh8_normal.jpg",
      description:
        "Frontier Research is an independent research and advisory group formed to bridge the gap between fundamental research and commercial products.",
      followersCount: 375,
      location: "",
      url: "http://frontier.tech",
      score: null,
      classification: "project",
      isCN: false,
      createdAt: "2023-06-19T16:47:18.153Z",
      updatedAt: "2023-07-04T14:03:00.745Z",
      followersAddSyncTime: null,
      followersSetSyncTime: null,
      scoreALL: 1289,
      kolCountALL: 57,
    },
    {
      id: "1665800134570176512",
      name: "Colony",
      username: "ParallelColony",
      createTime: "2023-06-05T19:26:13.000Z",
      avatar:
        "https://pbs.twimg.com/profile_images/1665812155722256384/HBzIw6Mj_normal.jpg",
      description:
        "Sign up below for early access to the next generation of gaming.",
      followersCount: 596,
      location: "",
      url: "http://parallel.life/colony/signup/",
      score: null,
      classification: "project",
      isCN: false,
      createdAt: "2023-06-06T06:55:22.639Z",
      updatedAt: "2023-07-04T12:44:55.461Z",
      followersAddSyncTime: null,
      followersSetSyncTime: null,
      scoreALL: 630,
      kolCountALL: 29,
    },
    {
      id: "1665797103023542273",
      name: "Dean Swennumson",
      username: "Dean_Swennumson",
      createTime: "2023-06-05T19:06:05.000Z",
      avatar:
        "https://pbs.twimg.com/profile_images/1674086735284772865/zu5LBunG_normal.jpg",
      description: "Co-Founder, Head of Operations\n\nhttps://t.co/CcVwZbDgCK",
      followersCount: 78,
      location: "",
      url: "http://superstate.co",
      score: null,
      classification: "person",
      isCN: false,
      createdAt: "2023-06-28T18:21:32.594Z",
      updatedAt: "2023-07-04T14:00:30.953Z",
      followersAddSyncTime: null,
      followersSetSyncTime: null,
      scoreALL: 524,
      kolCountALL: 20,
    },
    {
      id: "1669606555174486017",
      name: "DeFi Garage",
      username: "DeFiGarageDev",
      createTime: "2023-06-16T07:23:44.000Z",
      avatar:
        "https://pbs.twimg.com/profile_images/1670737377948762113/qGe2KCw1_normal.jpg",
      description:
        "Build. Deploy. Repeat. 🧪 | Discord: https://t.co/fvdMWSwQGy",
      followersCount: 584,
      location: "On chain",
      url: "https://defigarage.dev",
      score: null,
      classification: "project",
      isCN: false,
      createdAt: "2023-06-19T12:54:20.865Z",
      updatedAt: "2023-07-04T14:00:28.999Z",
      followersAddSyncTime: null,
      followersSetSyncTime: null,
      scoreALL: 514,
      kolCountALL: 27,
    },
    {
      id: "1665830136267120640",
      name: "MVP 🐻",
      username: "BeraMVP",
      createTime: "2023-06-05T21:17:23.000Z",
      avatar:
        "https://pbs.twimg.com/profile_images/1665830876070961156/BxOg4Ruk_normal.jpg",
      description: "basic building bera @berachain",
      followersCount: 298,
      location: "Bermuda",
      url: "https://berachain.com",
      score: null,
      classification: "project",
      isCN: false,
      createdAt: "2023-06-07T16:53:50.863Z",
      updatedAt: "2023-07-04T14:35:53.598Z",
      followersAddSyncTime: null,
      followersSetSyncTime: null,
      scoreALL: 435,
      kolCountALL: 21,
    },
  ];
  const info = z.array(newProjectSchema).parse(data);
  const result =
    info
      ?.map((_: any) => {
        return {
          ..._,
          subscribe: true,
        };
      })
      ?.sort((a, b) => b.scoreALL - a.scoreALL) ?? [];
  return result;
}
