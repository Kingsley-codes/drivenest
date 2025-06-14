"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { useQueryClient } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../../../lib/toast";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility state
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
      });

      // Handle successful login
      if (response.status === 200) {
        showSuccessToast("Login successful! Redirecting...");

        // Force immediate refetch of auth state
        await queryClient.invalidateQueries({ queryKey: ["auth"] });

        // 2. Wait briefly for the invalidation to complete
        await new Promise((resolve) => setTimeout(resolve, 100));

        // 3. Redirect to the dashboard or the path stored in localStorage
        const redirectPath = localStorage.getItem("preRegisterPath") || "/";
        localStorage.removeItem("preRegisterPath");

        router.push(redirectPath);
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (err) {
      let errorMessage = "Login failed. Please try again.";

      if (axios.isAxiosError(err)) {
        // Handle Axios-specific errors
        if (err.response) {
          errorMessage = err.response.data.message || errorMessage;
        } else if (err.request) {
          errorMessage = "No response from server. Please try again later.";
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      showErrorToast(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md rounded-2xl w-full space-y-8 border border-amber-400">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-amber-400">
            Welcome Back
          </h2>
        </div>
        {error && (
          <div className="bg-amber-50 border-x-4 rounded-md border-amber-500 p-4">
            <div className="flex">
              <div className="text-gray-900 w-full text-center">
                <p className="text-md">{error}</p>
              </div>
            </div>
          </div>
        )}
        <form className="m-8 p-4 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />

          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="my-4 rounded-md relative block w-full px-3 py-2 border bg-gray-950
                 border-amber-400 placeholder-amber-200 text-amber-400 focus:outline-none 
                 focus:ring-amber-300 focus:border-amber-500 focus:z-10 sm:text-sm autofill:bg-gray-950 autofill:text-amber-400"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="relative block w-full px-3 mb-3 py-2 border border-amber-400 placeholder-amber-200 
              text-amber-400 rounded-md focus:outline-none autofill:bg-gray-950 autofill:text-amber-400 focus:ring-amber-300 focus:border-amber-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            {/* Toggle button for showing/hiding password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-amber-400 hover:text-amber-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <BiShow className="h-5 w-5" />
              ) : (
                <BiHide className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-amber-400 hover:text-amber-300"
              >
                Forgot password
              </Link>
            </div>

            <div className="text-sm">
              New User?
              <Link
                href="/register"
                className="font-medium text-amber-400 pl-2 hover:text-amber-300"
              >
                Sign Up
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-950 bg-amber-400 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
