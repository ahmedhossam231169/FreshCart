"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthLayout from "@/src/components/auth/AuthLayout";
import { useCounts } from "@/src/context/CountsContext";

import {
  IconHeartFilled,
  IconTrash,
  IconArrowLeft,
} from "@/src/components/auth/icons";

export default function WishlistClient({
  data,
  token,
  onRemove,
}: {
  data: ProductI[];
  token?: string;
  onRemove: (productId: string) => Promise<void>;
}) {
  const [items, setItems] = useState(data);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ProductI | null>(null);
  const { setWishlistCount } = useCounts();

  async function handleConfirmRemove() {
    if (!selectedItem) return;
    await onRemove(selectedItem.id);
    setItems((prev) => prev.filter((i) => i.id !== selectedItem.id));
    setWishlistCount((prev) => Math.max(prev - 1, 0));
    setShowRemoveModal(false);
  }

  return (
    <AuthLayout>
      <div className="bg-white">
        {/* Breadcrumb */}
        <div className="px-[120px] pt-6 text-sm text-[#6a7282]">
          <Link href="/" className="hover:text-[#16a34a]">
            Home
          </Link>{" "}
          / <span className="text-[#1e2939]">Wishlist</span>
        </div>

        {/* Page title */}
        <div className="flex items-center gap-4 px-[120px] pt-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fef2f2]">
            <IconHeartFilled className="h-7 w-7 text-[#fb2c36]" />
          </span>
          <div>
            <h1 className="text-3xl font-bold text-[#1e2939]">My Wishlist</h1>
            <p className="text-sm text-[#6a7282]">
              {items.length} items saved
            </p>
          </div>
        </div>

        {/* Wishlist table */}
        <div className="mx-[120px] my-6 overflow-hidden rounded-xl border border-[#e5e7eb]">
          <div className="grid grid-cols-[1fr_160px_160px_220px] items-center bg-[#f9fafb] px-6 py-3 text-xs font-medium text-[#6a7282]">
            <span>Product</span>
            <span className="text-right">Price</span>
            <span className="text-center">Status</span>
            <span className="text-center">Actions</span>
          </div>

          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`grid grid-cols-[1fr_160px_160px_220px] items-center px-6 py-4 ${
                idx !== items.length - 1 ? "border-b border-[#e5e7eb]" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f3f4f6]">
                  <Image src={item.imageCover} alt={item.title} fill className="object-contain p-1" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1e2939]">{item.title}</h3>
                  <span className="text-xs text-[#6a7282]">{item.category?.name}</span>
                </div>
              </div>

              <span className="text-right text-sm font-bold text-[#1e2939]">
                {item.price} EGP
              </span>

              <div className="flex justify-center">
                <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-semibold text-[#6a7282]">
                  Not in Cart
                </span>
              </div>

              <div className="flex items-center justify-center gap-2">
                <Link
                  href="/cart"
                  className="flex items-center gap-1.5 rounded-lg border border-[#e5e7eb] px-3 py-2 text-xs font-semibold text-[#16a34a]"
                >
                  ✓ View Cart
                </Link>
                <button suppressHydrationWarning
                  type="button"
                  onClick={() => {
                    setSelectedItem(item);
                    setShowRemoveModal(true);
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#6a7282] hover:text-[#fb2c36]"
                >
                  <IconTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="px-[120px] pb-10">
          <Link
            href="/products"
            className="flex w-fit items-center gap-2 text-sm font-medium text-[#16a34a]"
          >
            <IconArrowLeft className="h-3.5 w-3.5" />
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Remove item confirm popup */}
      {showRemoveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[420px] rounded-2xl bg-white p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fef2f2]">
              <IconTrash className="h-7 w-7 text-[#fb2c36]" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-[#1e2939]">Remove Item?</h3>
            <p className="mt-2 text-sm text-[#6a7282]">
              Remove{" "}
              <span className="font-semibold text-[#1e2939]">{selectedItem?.title}</span> from
              your wishlist?
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button suppressHydrationWarning
                type="button"
                onClick={() => setShowRemoveModal(false)}
                className="flex-1 rounded-lg bg-[#f3f4f6] py-2.5 text-sm font-semibold text-[#1e2939]"
              >
                Cancel
              </button>
              <button suppressHydrationWarning
                type="button"
                onClick={handleConfirmRemove}
                className="flex-1 rounded-lg bg-[#fb2c36] py-2.5 text-sm font-semibold text-white"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
