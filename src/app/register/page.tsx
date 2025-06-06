"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineFacebook } from "react-icons/ai";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [error, setError] = useState(""); // State for form validation error
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const [passwordError, setPasswordError] = useState(""); // State for password validation error
  const [comfPassError, setComfPassError] = useState(""); // State for confirm password validation error
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility state
  const router = useRouter();

  const validatePassword = (password: string): string | null => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      return "Password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character";
    }
    return null;
  };

  const handleOAuthRedirect = (provider: "google" | "facebook") => {
    if (typeof window !== "undefined") {
      localStorage.setItem("preRegisterPath", window.location.pathname);
      document.cookie = `oauth_redirect=${window.location.pathname}; path=/`; // Set cookie for backend
      window.location.href = `/api/auth/${provider}`; // Redirect to provider route
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate password on typing
    if (name === "password") {
      const validationMessage = validatePassword(value);
      if (validationMessage) {
        setPasswordError(validationMessage);
      } else {
        setPasswordError("");
      }
    }

    // Validate confirm password on typing
    if (name === "passwordConfirm") {
      if (value !== formData.password) {
        setComfPassError("Passwords do not match");
      } else {
        setComfPassError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Set cookie with expiration (recommended)
      const expires = new Date();
      expires.setTime(expires.getTime() + 15 * 60 * 1000); // 15 minutes expiration
      document.cookie = `preRegisterPath=${pathname}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;

      // Submit form data directly without CSRF token
      await axios.post("/api/auth/register", formData, {
        withCredentials: true, // Include cookies (e.g. for sessions)
      });

      // Redirect to email verification page
      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const responseData = err.response?.data;

        if (Array.isArray(responseData?.errors)) {
          responseData.errors.forEach(
            (error: { field: string; message: string }) => {
              toast.error(`${error.field}: ${error.message}`);
            }
          );
        } else {
          toast.error(responseData?.message || "Registration failed.");
        }
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md rounded-2xl w-full space-y-8 border border-amber-400">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-amber-400">
            Create an Account
          </h2>
        </div>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="text-red-500">
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}
        <form className="m-8 p-4 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />

          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="my-4 rounded-md relative block w-full px-3 py-2 border bg-gray-950
                 border-amber-400 placeholder-amber-200 text-amber-400 focus:outline-none 
                 focus:ring-amber-300 focus:border-amber-500 focus:z-10 sm:text-sm autofill:bg-gray-950 autofill:text-amber-400"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

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

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="relative block w-full px-3 py-2 border border-amber-400 placeholder-amber-200 
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

            {passwordError && (
              <p className="text-amber-600 text-sm">{passwordError}</p>
            )}
          </div>

          <div>
            <label htmlFor="password-confirm" className="sr-only">
              Confirm Password
            </label>

            <div className="relative">
              <input
                id="password-confirm"
                name="passwordConfirm"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="relative block w-full px-3 py-2 mb-3 border border-amber-400 placeholder-amber-200 
              text-amber-400 rounded-md focus:outline-none autofill:bg-gray-950 autofill:text-amber-400 focus:ring-amber-300 focus:border-amber-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formData.passwordConfirm}
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
            {comfPassError && (
              <p className="text-amber-600 text-sm">{comfPassError}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              Already have an account?
              <Link
                href="/login"
                className="font-medium text-amber-400 pl-2 hover:text-amber-300"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-amber-400 focus:ring-amber-400 border-amber-300 rounded"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-amber-400"
            >
              I agree to the Terms and Conditions
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-950 bg-amber-400 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
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
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>

          <div className="text-center border-t mt-9 border-amber-300 pt-4">
            <h2 className=" text-amber-400 py-3">Other Sign Up Options</h2>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleOAuthRedirect("google")}
                className="text-amber-400 hover:text-amber-300 px-3 py-1 border border-amber-400 rounded-lg space-x-2"
              >
                <FcGoogle className="h-8 w-8 ml-3" />
                <p>Google</p>
              </button>

              <button
                onClick={() => handleOAuthRedirect("facebook")}
                className="text-amber-400 hover:text-amber-300 py-1 px-1 border border-amber-400 rounded-lg space-x-2"
              >
                <AiOutlineFacebook className="h-8 w-8 ml-5" />
                <p>Facebook</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
