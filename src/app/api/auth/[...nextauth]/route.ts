import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        address: {
          label: "address",
          type: "text",
          placeholder: "0x0",
        },
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials, req) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );
          // console.log("siwe: ", siwe);
          // process.env.NEXTAUTH_URL
          const nextAuthUrl = new URL(
            process.env.NEXTAUTH_URL
              ? process.env.NEXTAUTH_URL
              : "http://localhost:3000/"
          );
          // console.log("nextAuthUrl: ", nextAuthUrl);

          // console.log("nextAuthUrl: ", nextAuthUrl);
          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
          });
          // console.log("result: ", result);
          const user = {
            data: {
              role: "subscribe",
              expireDate: "2023-12-31",
            },
          };
          let role = "guest";
          let expireDate = null;
          if (user && user.data) {
            role = user.data.role;
            expireDate = user.data.expireDate;
          }

          if (result.success) {
            return {
              id: siwe.address,
              email: siwe.address,
              name: `${role}__${expireDate}`,
            };
          }
          return null;
        } catch (e) {
          console.log("err: ", e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  // pages: {
  //
  // },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.address = token.email;
      session.role = token.name;
      // session.user.role = token.role;
      // session.user.address = token.address;

      // console.log("session: ", session);
      return session;
    },
  },
});

export { handler as GET, handler as POST };
