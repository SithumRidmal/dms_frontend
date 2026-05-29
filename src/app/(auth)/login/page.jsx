"use client";

import { useState } from "react";
import AuthInput from "@/components/ui/AuthInput";
import PrimaryButton from "@/components/ui/PrimaryButton";
import TwoFactorAuthModal from "@/components/auth/TwoFactorAuthModal";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isTwoFactorOpen, setIsTwoFactorOpen] = useState(false);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  const isFormValid = !emailError && !passwordError;

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

    if (!isFormValid) return;

    console.log("Login submitted:", {
      email,
      password,
    });

    // Later:
    // 1. call login API
    // 2. if credentials are correct, open 2FA modal
    setIsTwoFactorOpen(true);
  };

  return (
    <>
      <main
        className={`flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 transition ${
          isTwoFactorOpen ? "blur-[2px]" : ""
        }`}
      >
        <div className="w-full max-w-[410px]">
          <div className="mx-auto mb-4 hidden h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-xs text-slate-500">
            Logo
          </div>

          <div className="mb-[18px] text-center">
            <h1 className="text-[20px] font-semibold leading-none text-[#111827]">
              DMS
            </h1>
            <p className="mt-[10px] text-[12px] text-[#64748B]">
              Document Management System
            </p>
          </div>

          <section className="rounded-[9px] border border-[#E2E8F0] bg-white px-[30px] py-[28px] shadow-sm">
            <div className="mb-[24px]">
              <h2 className="text-[17px] font-semibold text-[#111827]">
                Welcome back
              </h2>
              <p className="mt-[8px] text-[13px] text-[#64748B]">
                Sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-[18px]">
                <AuthInput
                  label="Email"
                  type="email"
                  placeholder="admin@dms.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({
                      ...prev,
                      email: true,
                    }))
                  }
                  leftIcon={<MailIcon />}
                  error={touched.email ? emailError : ""}
                />

                <AuthInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() =>
                    setTouched((prev) => ({
                      ...prev,
                      password: true,
                    }))
                  }
                  leftIcon={<LockIcon />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="flex items-center justify-center text-[#94A3B8] hover:text-[#64748B]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  }
                  error={touched.password ? passwordError : ""}
                />
              </div>

              <div className="mt-[15px] flex items-center justify-between">
                <label className="flex items-center gap-[8px] text-[13px] text-[#475569]">
                  <input
                    type="checkbox"
                    className="h-[13px] w-[13px] rounded border-[#CBD5E1] accent-[#2563EB]"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-[13px] font-medium text-[#2563EB] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="mt-[17px]">
                <PrimaryButton type="submit" disabled={!isFormValid}>
                  Sign In
                </PrimaryButton>
              </div>
            </form>
          </section>

          <p className="mt-[24px] text-center text-[11px] text-[#94A3B8]">
            Document Management System - Secure Access Only
          </p>
        </div>
      </main>

      <TwoFactorAuthModal
        isOpen={isTwoFactorOpen}
        onClose={() => setIsTwoFactorOpen(false)}
        email={email}
      />
    </>
  );
}

function validateEmail(email) {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(trimmedEmail)) {
    return "Enter a valid email address";
  }

  return "";
}

function validatePassword(password) {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  return "";
}

function MailIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.88 9.88A3 3 0 0 0 14.12 14.12" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c6.5 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3.5 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <path d="M2 2l20 20" />
    </svg>
  );
}