"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/src/components/auth/AuthLayout";
import { IconArrowLeft, IconHome, IconShoppingCart } from "@/src/components/auth/icons";

// Global 404 page - Next.js renders this automatically for any unmatched
// route (and for manual notFound() calls) anywhere in the app.
export default function NotFound() {
  const router = useRouter();

  return (
    <AuthLayout>
      <div className="relative flex flex-col items-center overflow-hidden bg-[#f0fdf4]/40 px-2 py-24 text-center">
        <div className="pointer-events-none absolute inset-0 text-4xl opacity-20">
          <span className="absolute left-[6%] top-[14%]">🍎</span>
          <span className="absolute left-[15%] top-[55%]">🍃</span>
          <span className="absolute right-[8%] top-[18%]">🥕</span>
          <span className="absolute right-[16%] top-[62%]">🌱</span>
        </div>

        <div className="relative">
          <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white shadow-sm">
            <IconShoppingCart className="h-14 w-14 text-[#16a34a]" />
          </div>
          <span className="absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#16a34a] text-lg font-bold text-white shadow-sm">
            404
          </span>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]/60" />
          <span className="h-1.5 w-16 rounded-full border-b-2 border-[#16a34a]/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]/60" />
        </div>

        <h1 className="relative mt-8 text-4xl font-bold text-[#101828]">Oops! Nothing Here</h1>
        <p className="relative mt-3 max-w-md text-base text-[#4a5565]">
          {`Looks like this page went out of stock! Don't worry, there's plenty more fresh content to explore.`}
        </p>

        <div className="relative mt-8 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-[#16a34a] px-6 py-3 text-base font-semibold text-white shadow-sm"
          >
            <IconHome className="h-4 w-4" />
            Go to Homepage
          </Link>
          <button suppressHydrationWarning
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-lg border border-[#d1d5dc] bg-white px-6 py-3 text-base font-semibold text-[#364153]"
          >
            <IconArrowLeft className="h-4 w-4" />
            Go Back
          </button>
        </div>

        <div className="relative mt-10 flex w-full max-w-max flex-col items-center gap-2 rounded-2xl bg-white p-6 shadow-sm">
          <span className="text-xs font-semibold tracking-wide text-[#99a1af]">
            POPULAR DESTINATIONS
          </span>
          <div className="flex  items-center justify-center gap-3">
            <Link
              href="/products"
              className="rounded-full bg-[#dcfce7] px-4 py-2 text-sm font-medium text-[#16a34a]"
            >
              All Products
            </Link>
            <a href="#" className="rounded-full bg-[#f3f4f6] px-4 py-2 text-sm font-medium text-[#364153]">
              Categories
            </a>
            <a href="#" className="rounded-full bg-[#f3f4f6] px-4 py-2 text-sm font-medium text-[#364153]">
              {`Today's Deals`}
            </a>
            <a href="#" className="rounded-full bg-[#f3f4f6] px-4 py-2 text-sm font-medium text-[#364153]">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
