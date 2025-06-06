// app/email-verified/page.tsx
"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function EmailVerifiedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(redirect || "/");
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [redirect, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-amber-400 px-4">
      <div className="max-w-md w-full space-y-6 text-center border border-amber-400 rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Email Verified!</h1>
        <p>Your email has been successfully verified.</p>
        <p>You'll be redirected shortly...</p>
      </div>
    </div>
  );
}
