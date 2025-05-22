// app/email-verified/layout.tsx
import { ReactNode } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function EmailVerifiedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
