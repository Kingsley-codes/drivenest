"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingPage() {
  const router = useRouter();

  // In a real app, you would check if the user is actually logged in
  // and redirect to login if not
  useEffect(() => {
    // Example: Check if user is authenticated
    // if (!isAuthenticated) {
    //   router.push('/login');
    // }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-amber-400 rounded-2xl space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-950">
            Welcome to Your Onboarding
          </h2>
          <p className="mt-2 text-sm text-gray-950">
            Let's get you set up with your account
          </p>
        </div>

        <div className="py-8 px-4 shadow rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-950"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="mt-1 block w-full border text-gray-950 border-gray-950
                 rounded-md py-2 px-3 focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-950"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="mt-1 block w-full border text-gray-950 border-gray-950
                 rounded-md py-2 px-3 focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-950"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full border text-gray-950 border-gray-950
                 rounded-md py-2 px-3 focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-950"
              >
                Company (Optional)
              </label>
              <input
                type="text"
                id="company"
                className="mt-1 block w-full border border-gray-950
                 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border
                 border-transparent rounded-md shadow-sm text-sm font-medium
                  text-amber-400 bg-gray-950 hover:bg-gray-900 focus:outline-none
                   focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Complete Onboarding
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
