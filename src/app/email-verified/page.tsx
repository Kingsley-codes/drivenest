// app/email-verified/page.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function EmailVerifiedRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run on client side
    const status = searchParams.get("status");
    const redirectPath =
      typeof window !== "undefined"
        ? localStorage.getItem("preRegisterPath") || "/"
        : "/";

    if (status === "success") {
      if (typeof window !== "undefined") {
        localStorage.removeItem("preRegisterPath");
      }
      router.push(redirectPath);
    } else {
      router.push("/error?code=email_verification_failed");
    }
  }, [router, searchParams]);

  // Optional: Show a simple loading message
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="text-amber-400 text-xl">Processing verification...</div>
    </div>
  );
}

// Ensure this page is never statically generated
export const dynamic = "force-dynamic";
