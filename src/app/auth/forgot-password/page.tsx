"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/src/components/auth/AuthLayout";
import Logo from "@/src/components/auth/Logo";
import {
  IconArrowLeft,
  IconEnvelopeCheck,
  IconKey,
  IconLock,
  IconMail,
  IconShieldCheck,
} from "@/src/components/auth/icons";

// This is just the UI for the forgot password page. There is no real "send reset code" logic here yet.
export default function ForgotPasswordPage() {
  // Controlled input so the field renders correctly - not connected to any submit logic yet.
  const [email, setEmail] = useState("");

  return (
    <AuthLayout>
      <div className="mx-auto flex max-w-[1280px] items-center gap-12 px-8 py-[48px]">
        {/* Left side: decorative graphic + text */}
        <div className="flex flex-1 flex-col items-center gap-6 text-center">
          <div className="relative flex h-[384px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#f0fdf4] via-[#f0fdf4] to-[#f3f4f6] shadow-lg">
            <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-[#dcfce7]/50" />
            <div className="absolute bottom-12 right-10 h-32 w-32 rounded-full bg-[#dcfce7]/50" />
            <div className="absolute right-20 top-20 h-16 w-16 rounded-full bg-[#d0fae5]/50" />

            <div className="flex items-center gap-6">
              <div className="-rotate-12 rounded-xl bg-white p-3 shadow-lg">
                <IconEnvelopeCheck className="h-7 w-7 text-[#364153]" />
              </div>
              <div className="flex rotate-3 flex-col items-center gap-4 rounded-3xl bg-white p-4 shadow-xl">
                <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#dcfce7]">
                  <IconLock className="h-9 w-9 text-[#16a34a]" />
                </span>
                <div className="flex gap-3">
                  <span className="h-3 w-3 rounded-full bg-[#4ade80]" />
                  <span className="h-3 w-3 rounded-full bg-[#22c55e]" />
                  <span className="h-3 w-3 rounded-full bg-[#16a34a]" />
                </div>
              </div>
              <div className="rotate-12 rounded-xl bg-white p-3 shadow-lg">
                <IconShieldCheck className="h-7 w-7 text-[#364153]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold text-[#1e2939]">Reset Your Password</h2>
            <p className="text-lg text-[#4a5565]">
              {`Don't worry, it happens to the best of us. We'll help you get back into your account
              in no time.`}
            </p>

            <div className="flex items-center justify-center gap-8">
              <span className="flex items-center gap-2 text-sm text-[#6a7282]">
                <IconMail className="h-3.5 w-3.5" />
                Email Verification
              </span>
              <span className="flex items-center gap-2 text-sm text-[#6a7282]">
                <IconShieldCheck className="h-3.5 w-3.5" />
                Secure Reset
              </span>
              <span className="flex items-center gap-2 text-sm text-[#6a7282]">
                <IconLock className="h-3.5 w-3.5" />
                Encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Right side: the forgot password card */}
        <div className="flex-1 rounded-2xl bg-white p-12 shadow-xl">
          <div className="flex flex-col items-center gap-3 text-center">
            <Logo />
            <h1 className="text-2xl font-bold text-[#1e2939]">Forgot Password?</h1>
            <p className="text-base text-[#4a5565]">{`No worries, we'll send you a reset code`}</p>
          </div>

          {/* Step indicator: step 1 (email) is active, steps 2 and 3 are still ahead */}
          <div className="mt-8 flex items-center justify-center">
            <div className="flex items-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16a34a] text-white ring-4 ring-[#dcfce7]">
                <IconMail className="h-3.5 w-3.5" />
              </span>
              <span className="mx-2 h-0.5 w-16 bg-[#e5e7eb]" />
            </div>
            <div className="flex items-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#6a7282]">
                <IconKey className="h-3.5 w-3.5" />
              </span>
              <span className="mx-2 h-0.5 w-16 bg-[#e5e7eb]" />
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#6a7282]">
              <IconLock className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* TODO: handle "send reset code" submit */}
          <form className="mt-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-[#364153]">
                Email Address
              </label>
              <div className="relative">
                <IconMail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#364153]/50" />
                <input suppressHydrationWarning
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-xl border-2 border-[#e5e7eb] py-3.5 pl-12 pr-4 text-base text-[#364153] placeholder:text-[#364153]/50"
                />
              </div>
            </div>

            <button suppressHydrationWarning
              type="submit"
              className="w-full rounded-xl bg-[#16a34a] px-4 py-3 text-lg font-semibold text-white shadow-lg"
            >
              Send Reset Code
            </button>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm font-medium text-[#16a34a]"
            >
              <IconArrowLeft className="h-3 w-3.5" />
              Back to Sign In
            </Link>
          </form>

          <div className="mt-8 border-t border-[#f3f4f6] pt-6 text-center text-base">
            <span className="text-[#4a5565]">Remember your password? </span>
            <Link href="/login" className="font-semibold text-[#16a34a]">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
