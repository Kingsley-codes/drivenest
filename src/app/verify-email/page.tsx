// app/verify-email/page.tsx
import Link from "next/link";
import { type Metadata } from "next";

// Generate metadata (optional)
export const metadata: Metadata = {
  title: "Verify Your Email",
};

// Define proper props type
interface VerifyEmailPageProps {
  searchParams: {
    email: string;
    redirect?: string;
  };
}

export default function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-amber-400 px-4">
      <div className="max-w-md w-full space-y-6 text-center border border-amber-400 rounded-2xl p-6">
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <p>
          We sent a verification link to{" "}
          <span className="font-semibold">{searchParams.email}</span>.
          <br />
          Please check your inbox and click the link to continue.
        </p>
        <p className="text-sm text-amber-300">
          Didn&apos;t get the email?{" "}
          <Link
            href={`/resend-verification?email=${encodeURIComponent(searchParams.email)}${searchParams.redirect ? `&redirect=${encodeURIComponent(searchParams.redirect)}` : ""}`}
            className="underline hover:text-amber-200"
          >
            Resend
          </Link>
        </p>
      </div>
    </div>
  );
}
