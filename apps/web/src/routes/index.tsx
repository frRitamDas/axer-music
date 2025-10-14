import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { trpc } from "~/lib/trpc";

const HomeComponent: React.FC = () => {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-4xl">Home</h1>
      <p className="text-lg">
        API is {healthCheck.data ? "healthy" : "unhealthy"}
      </p>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: HomeComponent,
});
