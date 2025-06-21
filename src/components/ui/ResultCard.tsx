import * as React from "react";
import { cn } from "../../../lib/utils";

const ResultCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-amber-400 hover:bg-amber-300 text-gray-800",
      className
    )}
    {...props}
  />
));
ResultCard.displayName = "ResultCard";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
CardContent.displayName = "CardContent";

export { ResultCard, CardContent };
