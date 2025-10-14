import "@infinitunes/ui/globals.css";

import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { Providers } from "./components/providers";
import { Spinner } from "./components/spinner";
import { queryClient, trpc } from "./lib/trpc";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: { trpc, queryClient },
    defaultPendingComponent: () => <Spinner className="h-svh" />,
    defaultNotFoundComponent: () => <div>Not Found</div>,
    Wrap: ({ children }) => <Providers>{children}</Providers>,
  });

  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
