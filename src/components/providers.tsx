"use client";

import { ThemeProvider } from "next-themes";
import type { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "jotai";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://e41602d3b18c4cecb9f74487044d4a14@o4505346915172352.ingest.sentry.io/4505346917793792",
  integrations: [
    new Sentry.BrowserTracing({
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      // tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  // replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  // replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.warn("An API request failed", 6);
      console.log(error);
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, goerli],
    [publicProvider()]
  );
  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });
  return (
    <WagmiConfig config={config}>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <SessionProvider>{children}</SessionProvider>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </WagmiConfig>
  );
};

export default Providers;
