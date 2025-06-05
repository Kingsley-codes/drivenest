// app/email-verified/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function EmailVerifiedPage() {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const verificationStatus = searchParams.get("status");

    if (verificationStatus === "success") {
      setStatus("success");
      const redirectPath = localStorage.getItem("preRegisterPath") || "/";
      localStorage.removeItem("preRegisterPath");

      setTimeout(() => {
        router.push(redirectPath);
      }, 2000);
    } else {
      setStatus("error");
    }
  }, [isClient, searchParams, router]);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12">
        <div className="max-w-md w-full text-center">
          <h2 className="text-amber-400 text-2xl mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12">
      <div className="max-w-md w-full text-center">
        {status === "verifying" && (
          <>
            <h2 className="text-amber-400 text-2xl mb-4">
              Verifying your email...
            </h2>
            <p className="text-amber-300">
              Please wait while we confirm your account.
            </p>
          </>
        )}
        {status === "success" && (
          <>
            <h2 className="text-amber-400 text-2xl mb-4">Email Verified!</h2>
            <p className="text-amber-300">Redirecting you shortly...</p>
          </>
        )}
        {status === "error" && (
          <>
            <h2 className="text-red-500 text-2xl mb-4">Verification Failed</h2>
            <p className="text-red-300">
              Something went wrong. Please try again or contact support.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
