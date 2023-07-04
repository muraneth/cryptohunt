import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const topTweetSchema = z.object({
  id: z.string(),
  text: z.string(),
  langChinese: z.string().optional().nullable(),
  createTime: z.string(),
  classification: z.string().optional().nullable(),
  airdropTag: z.string().optional().nullable(),
  score: z.number(),
  twitterUser: z.object({
    id: z.string(),
    name: z.string(),
    username: z.string(),
  }),
  web3OrCrypto: z.boolean().optional().nullable(),
  tags: z.array(z.string()).optional().nullable(),
  tagsAlpha: z.array(z.string()).optional().nullable(),
  airdropRelevant: z.boolean().optional().nullable(),
  subscribe: z.boolean().optional(),
  payment: z.any().optional(),
});

export type topTweet = z.infer<typeof topTweetSchema>;

export const topTwitterUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  createTime: z.string(),
  avatar: z.string(),
  description: z.string(),
  classification: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  followersCount: z.number(),
  score1d: z.number(),
  score2d: z.number(),
  score3d: z.number(),
  score5d: z.number(),
  score7d: z.number(),
  score14d: z.number(),
  score30d: z.number(),
  scoreTrack: z.number().optional().nullable(),
  subscribe: z.boolean().optional(),
  payment: z.any().optional(),
});

export type topTwitterUser = z.infer<typeof topTwitterUserSchema>;

export const newProjectSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  createTime: z.string(),
  avatar: z.string(),
  description: z.string(),
  classification: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  followersCount: z.number(),
  scoreALL: z.number(),
  subscribe: z.boolean().optional(),
  payment: z.any().optional(),
});

export type newProject = z.infer<typeof newProjectSchema>;

export const topTagSchema = z.object({
  id: z.string(),
  type: z.string().optional().nullable(),
  tag: z.string().optional().nullable(),
  score1d: z.number(),
  score2d: z.number(),
  score3d: z.number(),
  score5d: z.number(),
  score7d: z.number(),
  score14d: z.number(),
  score30d: z.number(),
  price: z.any(),
  subscribe: z.boolean().optional(),
  payment: z.any().optional(),
});

export type topTag = z.infer<typeof topTagSchema>;

export const topMediaSchema = z.object({
  id: z.string(),
  type: z.string(),
  url: z.string(),
  score1d: z.number(),
  score2d: z.number(),
  score3d: z.number(),
  score5d: z.number(),
  score7d: z.number(),
  score14d: z.number(),
  score30d: z.number(),
  subscribe: z.boolean().optional(),
  payment: z.any().optional(),
});

export type topMedia = z.infer<typeof topMediaSchema>;
