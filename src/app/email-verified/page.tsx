"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EmailVerifiedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );

  const verificationStatus = searchParams.get("status");

  useEffect(() => {
    if (verificationStatus === "success") {
      setStatus("success");

      // Get redirect path from localStorage or default to home
      const redirectPath = localStorage.getItem("preRegisterPath") || "/";
      localStorage.removeItem("preRegisterPath");

      setTimeout(() => {
        router.push(redirectPath);
      }, 2000);
    } else {
      setStatus("error");
    }
  }, [verificationStatus, router]);

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
