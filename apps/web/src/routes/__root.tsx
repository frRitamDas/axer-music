import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";

import type { AppRouter } from "@infinitunes/api/routers/index";
import { Toaster } from "@infinitunes/ui/components/sonner";
import appCss from "@infinitunes/ui/globals.css?url";

import { Spinner } from "~/components/spinner";

const RootDocument: React.FC = () => {
  const isFetching = useRouterState({ select: (s) => s.isLoading });

  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>

      <body className="grid min-h-dvh grid-rows-[auto_1fr_auto] scroll-smooth font-sans antialiased selection:bg-foreground selection:text-background">
        {isFetching ? <Spinner className="h-svh" /> : <Outlet />}

        <Toaster richColors />
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
};

export type RouterAppContext = {
  trpc: TRPCOptionsProxy<AppRouter>;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "My App" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),

  component: RootDocument,
});
