"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios, { AxiosError } from "axios";

interface FormData {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface Errors {
  [key: string]: string | undefined;
  general?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

interface CsrfTokenResponse {
  csrfToken: string;
}

const SignupPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // 1. Get CSRF token first
      const {
        data: { csrfToken },
      } = await axios.get<CsrfTokenResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/csrf-token`
      );

      // 2. Submit registration data
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
        formData,
        {
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // 3. Redirect to verification page on success
      router.push({
        pathname: "/verify-email",
        query: { email: formData.email },
      });
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        handleRegistrationError(error);
      } else {
        // Handle non-Axios errors
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  interface ValidationError {
    param: string;
    msg: string;
  }

  interface ErrorResponse {
    errors?: ValidationError[];
    message?: string;
  }

  const handleRegistrationError = (error: AxiosError<ErrorResponse>) => {
    if (error.response?.data?.errors) {
      // Format validation errors
      const formattedErrors = error.response.data.errors.reduce(
        (acc: Errors, err) => {
          acc[err.param] = err.msg;
          return acc;
        },
        {}
      );
      setErrors(formattedErrors);
    } else {
      // Generic error message
      setErrors({
        general:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    }
  };

  const handleOAuthSignup = (provider: string) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/${provider}`;
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Your Account</h1>

        {errors.general && (
          <div className="auth-error-message">{errors.general}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={errors.username ? "input-error" : ""}
              required
            />
            {errors.username && (
              <span className="error-text">{errors.username}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "input-error" : ""}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? "input-error" : ""}
              required
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              id="passwordConfirm"
              type="password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              className={errors.passwordConfirm ? "input-error" : ""}
              required
            />
            {errors.passwordConfirm && (
              <span className="error-text">{errors.passwordConfirm}</span>
            )}
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="oauth-buttons">
          <button
            type="button"
            className="oauth-button google"
            onClick={() => handleOAuthSignup("google")}
          >
            Continue with Google
          </button>
          <button
            type="button"
            className="oauth-button facebook"
            onClick={() => handleOAuthSignup("facebook")}
          >
            Continue with Facebook
          </button>
          <button
            type="button"
            className="oauth-button instagram"
            onClick={() => handleOAuthSignup("instagram")}
          >
            Continue with Instagram
          </button>
        </div>

        <div className="auth-footer">
          Already have an account? <Link href="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
