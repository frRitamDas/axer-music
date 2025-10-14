import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import {
  createTRPCClient,
  httpBatchStreamLink,
  TRPCClientError,
} from "@trpc/client";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import {
  createTRPCContext,
  createTRPCOptionsProxy,
} from "@trpc/tanstack-react-query";

import type { AppRouter } from "@infinitunes/api/routers";
import { toast } from "@infinitunes/ui/components/sonner";

const handleError = (
  error: Error,
  meta?: { skipGlobalToast?: boolean; errorMessage?: string },
) => {
  if (meta?.skipGlobalToast) return;

  const httpCode =
    error instanceof TRPCClientError ? error.data?.httpStatus : null;
  const isServerError = httpCode && httpCode >= 500 && httpCode < 600;

  const errorMessage =
    meta?.errorMessage ||
    (isServerError
      ? "Internal server error. Please try again later."
      : error.message);

  toast.error(errorMessage, {
    action: {
      label: "retry",
      onClick: () => queryClient.invalidateQueries(),
    },
  });
};

const handleSuccess = (
  meta?: Partial<{ skipGlobalToast: boolean; successMessage: string }>,
) => {
  if (!meta || meta.skipGlobalToast) return;

  toast.success(meta.successMessage);
};

export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
  queryCache: new QueryCache({
    onSuccess: (_data, query) => handleSuccess(query.meta),
    onError: (error, query) => handleError(error, query.meta),
  }),
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) =>
      handleSuccess(mutation.meta),
    onError: (error, _variables, _context, mutation) =>
      handleError(error, mutation.meta),
    onSettled: (_data, _error, _variables, _context, mutation) => {
      if (mutation.meta?.invalidatesQueries) {
        queryClient.invalidateQueries({
          queryKey: mutation.meta.invalidatesQueries,
        });
      }
    },
  }),
});

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchStreamLink({
      url: "/api/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

export const trpc = createTRPCOptionsProxy({
  client: trpcClient,
  queryClient: queryClient,
});

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
