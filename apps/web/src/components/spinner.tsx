import type React from "react";

import { cn } from "~/lib/utils";

export const Spinner: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn("grid place-items-center", className)} {...props}>
      <span className="sr-only">Loading...</span>
      <div className="aspect-square h-16 animate-spin rounded-full border-primary border-y-2 lg:h-32" />
    </div>
  );
};
