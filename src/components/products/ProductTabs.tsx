"use client";

import { useState } from "react";
import {
  IconBox,
  IconStar,
  IconTruck,
  IconArrowPath,
  IconShieldCheck,
  IconCheckCircle,
} from "@/src/components/auth/icons";

type ProductTabsProps = {
  description: string;
  category: string;
  subcategory: string;
  brand: string;
  itemsSold: string;
  rating: number;
  reviewCount: number;
};

// TODO: the rating breakdown and reviews list are just static dummy numbers for now
const ratingBreakdown = [
  { stars: 5, percent: 25 },
  { stars: 4, percent: 60 },
  { stars: 3, percent: 25 },
  { stars: 2, percent: 5 },
  { stars: 1, percent: 5 },
];

type Tab = "details" | "reviews" | "shipping";

export default function ProductTabs({
  description,
  category,
  subcategory,
  brand,
  itemsSold,
  rating,
  reviewCount,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("details");

  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white">
      <div className="flex items-center gap-8 border-b border-[#e5e7eb] px-6">
        <button suppressHydrationWarning
          type="button"
          onClick={() => setActiveTab("details")}
          className={`flex items-center gap-2 border-b-2 py-4 text-sm font-semibold ${
            activeTab === "details"
              ? "border-[#16a34a] text-[#16a34a]"
              : "border-transparent font-medium text-[#6a7282]"
          }`}
        >
          <IconBox className="h-4 w-4" />
          Product Details
        </button>
        <button suppressHydrationWarning
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 border-b-2 py-4 text-sm font-semibold ${
            activeTab === "reviews"
              ? "border-[#16a34a] text-[#16a34a]"
              : "border-transparent font-medium text-[#6a7282]"
          }`}
        >
          <IconStar className="h-4 w-4" />
          Reviews ({reviewCount})
        </button>
        <button suppressHydrationWarning
          type="button"
          onClick={() => setActiveTab("shipping")}
          className={`flex items-center gap-2 border-b-2 py-4 text-sm font-semibold ${
            activeTab === "shipping"
              ? "border-[#16a34a] text-[#16a34a]"
              : "border-transparent font-medium text-[#6a7282]"
          }`}
        >
          <IconTruck className="h-4 w-4" />
          Shipping &amp; Returns
        </button>
      </div>

      {activeTab === "details" && (
        <div className="p-6">
          <h3 className="text-base font-semibold text-[#1e2939]">About this Product</h3>
          <p className="mt-2 text-sm text-[#4a5565]">{description}</p>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="rounded-lg bg-[#f9fafb] p-5">
              <h4 className="text-sm font-semibold text-[#1e2939]">Product Information</h4>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#6a7282]">Category</span>
                  <span className="font-medium text-[#1e2939]">{category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6a7282]">Subcategory</span>
                  <span className="font-medium text-[#1e2939]">{subcategory}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6a7282]">Brand</span>
                  <span className="font-medium text-[#1e2939]">{brand}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6a7282]">Items Sold</span>
                  <span className="font-medium text-[#1e2939]">{itemsSold}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-[#f9fafb] p-5">
              <h4 className="text-sm font-semibold text-[#1e2939]">Key Features</h4>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-[#364153]">
                <li className="flex items-center gap-2">
                  <IconCheckCircle className="h-4 w-4 text-[#16a34a]" />
                  Premium Quality Product
                </li>
                <li className="flex items-center gap-2">
                  <IconCheckCircle className="h-4 w-4 text-[#16a34a]" />
                  100% Authentic Guarantee
                </li>
                <li className="flex items-center gap-2">
                  <IconCheckCircle className="h-4 w-4 text-[#16a34a]" />
                  Fast &amp; Secure Packaging
                </li>
                <li className="flex items-center gap-2">
                  <IconCheckCircle className="h-4 w-4 text-[#16a34a]" />
                  Quality Tested
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="p-6">
          <div className="flex items-start gap-10">
            <div className="flex shrink-0 flex-col items-center gap-1">
              <span className="text-4xl font-bold text-[#1e2939]">{rating}</span>
              <span className="flex items-center gap-0.5 text-[#facc15]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <IconStar
                    key={index}
                    className={`h-4 w-4 ${index < rating ? "" : "text-[#e5e7eb]"}`}
                  />
                ))}
              </span>
              <span className="text-xs text-[#6a7282]">Based on {reviewCount} reviews</span>
            </div>

            <div className="flex flex-1 flex-col gap-2.5">
              {ratingBreakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-12 shrink-0 text-[#4a5565]">{row.stars} star</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e5e7eb]">
                    <div
                      className="h-full rounded-full bg-[#facc15]"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right text-[#6a7282]">{row.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* TODO: this is just an empty state for now, real reviews list goes here */}
          <div className="mt-8 flex flex-col items-center gap-3 border-t border-[#e5e7eb] py-10 text-center">
            <IconStar className="h-8 w-8 text-[#d1d5dc]" />
            <p className="text-sm text-[#6a7282]">Customer reviews will be displayed here.</p>
            <button suppressHydrationWarning type="button" className="text-sm font-semibold text-[#16a34a]">
              Write a Review
            </button>
          </div>
        </div>
      )}

      {activeTab === "shipping" && (
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-lg bg-[#f0fdf4] p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16a34a]">
                  <IconTruck className="h-4 w-4 text-white" />
                </span>
                <h4 className="text-sm font-semibold text-[#1e2939]">Shipping Information</h4>
              </div>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-[#364153]">
                <li className="flex items-center gap-2">
                  <IconCheckCircle className="h-4 w-4 shrink-0 text-[#16a34a]" />
                  Free shipping on orders over $50
                </li>
                <li className="flex items-center gap-2">
                  <IconCheckCircle className="h-4 w-4 shrink-0 text-[#16a34a]" />
                  Standard delivery: 3-5 business days
                </li>
                <li className="flex items-center gap-2">
                  <IconCheckCircle className="h-4 w-4 shrink-0 text-[#16a34a]" />
                  Express delivery available (1-2 business days)
                </li>
                <li className="flex items-center gap-2">
                  <IconCheckCircle className="h-4 w-4 shrink-0 text-[#16a34a]" />
                  Track your order in real-time
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-[#f0fdf4] p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16a34a]">
                  <IconArrowPath className="h-4 w-4 text-white" />
                </span>
                <h4 className="text-sm font-semibold text-[#1e2939]">Returns &amp; Refunds</h4>
              </div>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-[#364153]">
                <li className="flex items-center gap-2">
                  <IconCheckCircle className="h-4 w-4 shrink-0 text-[#16a34a]" />
                  30-day hassle-free returns
                </li>
                <li className="flex items-center gap-2">
                  <IconCheckCircle className="h-4 w-4 shrink-0 text-[#16a34a]" />
                  Full refund or exchange available
                </li>
                <li className="flex items-center gap-2">
                  <IconCheckCircle className="h-4 w-4 shrink-0 text-[#16a34a]" />
                  Free return shipping on defective items
                </li>
                <li className="flex items-center gap-2">
                  <IconCheckCircle className="h-4 w-4 shrink-0 text-[#16a34a]" />
                  Easy online return process
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-4 rounded-lg bg-[#f3f4f6] p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e5e7eb]">
              <IconShieldCheck className="h-5 w-5 text-[#4a5565]" />
            </span>
            <div>
              <h4 className="text-sm font-semibold text-[#1e2939]">Buyer Protection Guarantee</h4>
              <p className="mt-1 text-sm text-[#4a5565]">
                {`Get a full refund if your order doesn't arrive or isn't as described. We ensure your shopping experience is safe and secure.`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
