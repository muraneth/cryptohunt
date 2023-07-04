// Use type safe message keys with `next-intl`
type Messages = typeof import("./src/lang/en-US.json");
declare interface IntlMessages extends Messages {}

import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    address: string;
    role: string;
    // user: {
    //     /** The user's postal address. */
    //     address: string
    // }
  }
}
