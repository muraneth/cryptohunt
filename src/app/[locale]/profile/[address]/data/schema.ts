import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const holdTokensRnn3Schema = z.object({
  contract: z.string(),
  name: z.string(),
  symbol: z.string(),
  decimal: z.string(),
  network: z.string(),
  count: z.string(),
});

export type holdTokensRnn3 = z.infer<typeof holdTokensRnn3Schema>;

export const holdNftsRnn3Schema = z.object({
  contract: z.string(),
  description: z.string(),
  externalurl: z.string(),
  imageurl: z.string(),
  name: z.string(),
  network: z.string(),
  primaryInterface: z.string(),
  symbol: z.string(),
  createat: z.string(),
  updateat: z.string(),
  count: z.string(),
});

export type holdNftsRnn3 = z.infer<typeof holdNftsRnn3Schema>;

export const attendEventsRnn3Schema = z.object({
  addr: z.string(),
  id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
});

export type attendEventsRnn3 = z.infer<typeof attendEventsRnn3Schema>;

export const accountBalanceChainBaseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.string(),
});

export type accountBalanceChainBase = z.infer<
  typeof accountBalanceChainBaseSchema
>;
