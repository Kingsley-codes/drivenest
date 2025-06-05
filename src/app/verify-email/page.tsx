"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const redirect = searchParams.get("redirect");
  const [isClient, setIsClient] = useState(false); // Properly declare isClient state

  // Store the redirect path in localStorage when component mounts
  useEffect(() => {
    setIsClient(true);
    if (redirect) {
      localStorage.setItem("preRegisterPath", redirect);
    }
  }, [redirect]);

  if (!isClient) return null; // Prevents SSR hydration issues

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-amber-400 px-4">
      <div className="max-w-md w-full space-y-6 text-center border border-amber-400 rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <p>
          We sent a verification link to{" "}
          <span className="font-semibold">{email}</span>. <br />
          Please check your inbox and click the link to continue.
        </p>

        <p className="text-sm text-amber-300">
          Didn&apos;t get the email?{" "}
          <Link
            href="/resend-verification"
            className="underline hover:text-amber-200"
          >
            Resend
          </Link>
        </p>
      </div>
    </div>
  );
}
