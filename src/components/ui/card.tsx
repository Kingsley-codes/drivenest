import * as React from "react";
import { cn } from "../../../lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  border?: boolean;
  shadow?: "sm" | "md" | "lg" | "xl" | "none";
  rounded?: "sm" | "md" | "lg" | "xl" | "full" | "none";
}

const Card = ({
  children,
  className = "",
  hoverEffect = false,
  border = true,
  shadow = "md",
  rounded = "md",
}: CardProps) => {
  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    none: "",
  };

  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
    none: "",
  };

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800",
        border && "border border-gray-200 dark:border-gray-700",
        shadowClasses[shadow],
        roundedClasses[rounded],
        hoverEffect &&
          "transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader = ({ children, className = "" }: CardHeaderProps) => (
  <div
    className={cn(
      "p-4 border-b border-gray-200 dark:border-gray-700",
      className
    )}
  >
    {children}
  </div>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent = ({ children, className = "" }: CardContentProps) => (
  <div className={cn("p-4", className)}>{children}</div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter = ({ children, className = "" }: CardFooterProps) => (
  <div
    className={cn(
      "p-4 border-t border-gray-200 dark:border-gray-700",
      className
    )}
  >
    {children}
  </div>
);

export { Card, CardHeader, CardContent, CardFooter };
