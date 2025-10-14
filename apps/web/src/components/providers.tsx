import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient, TRPCProvider, trpcClient } from "~/lib/trpc";

export const Providers: React.FCC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
};
