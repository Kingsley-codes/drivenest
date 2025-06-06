// app/verify-email/page.tsx
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const redirect = searchParams.get("redirect");

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-amber-400 px-4">
        <div className="max-w-md w-full space-y-6 text-center border border-amber-400 rounded-2xl p-6">
          <h1 className="text-2xl font-bold">Error</h1>
          <p>No email address provided for verification.</p>
          <Link href="/" className="underline hover:text-amber-200">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-amber-400 px-4">
      <div className="max-w-md w-full space-y-6 text-center border border-amber-400 rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <p>
          We sent a verification link to{" "}
          <span className="font-semibold">{email}</span>.
          <br />
          Please check your inbox and click the link to continue.
        </p>
        <p className="text-sm text-amber-300">
          Didn&apos;t get the email?{" "}
          <Link
            href={`/resend-verification?email=${encodeURIComponent(email)}${redirect ? `&redirect=${encodeURIComponent(redirect)}` : ""}`}
            className="underline hover:text-amber-200"
          >
            Resend
          </Link>
        </p>
      </div>
    </div>
  );
}
