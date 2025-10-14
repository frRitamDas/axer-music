import "./globals.css";

import { Stack } from "expo-router";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "~/lib/trpc";

export const RootLayout: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
};

export default RootLayout;
