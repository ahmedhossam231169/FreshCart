"use client";

import { IconHeart, IconHeartFilled } from '@/src/components/auth/icons'
import { addToWishList, removeToWishList } from '@/src/services/wishList.service';
import { useCounts } from '@/src/context/CountsContext';
import toast from 'react-hot-toast';

import React, { useState } from 'react'

export default function AddToWishtBtn({
  id,
  token,
  initialInWishlist = false,
  variant = "icon",
}: {
  id: string;
  token: string;
  initialInWishlist?: boolean;
  variant?: "icon" | "full";
}) {
  const [inWishlist, setInWishlist] = useState(initialInWishlist);
  const [loading, setLoading] = useState(false);
  const { setWishlistCount } = useCounts();

  async function toggleWishHandler(productId: string, userToken: string) {
    if (loading) return;
    setLoading(true);
    try {
      if (inWishlist) {
        const data = await removeToWishList(userToken, productId);
        setInWishlist(false);
        setWishlistCount(data.data.length);
        toast.success("Item removed from your wishlist!");
      } else {
        const data = await addToWishList(userToken, productId);
        setInWishlist(true);
        setWishlistCount(data.data.length);
        toast.success("Item added to your wishlist!");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update wishlist.");
    } finally {
      setLoading(false);
    }
  }
  if (variant === "full") {
    return (
      <button suppressHydrationWarning onClick={() => toggleWishHandler(id, token)}
        type="button"
        disabled={loading}
        aria-pressed={inWishlist}
        className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors disabled:opacity-60 ${
          inWishlist
            ? "bg-[#fef2f2] text-[#fb2c36] hover:bg-[#fee2e2]"
            : "border border-[#e5e7eb] bg-white text-[#4a5565] hover:text-[#fb2c36]"
        }`}
      >
        {inWishlist ? <IconHeartFilled className="h-4 w-4" /> : <IconHeart className="h-4 w-4" />}
        {inWishlist ? "In Wishlist" : "Add to Wishlist"}
      </button>
    );
  }

  return (
    <>
      <button suppressHydrationWarning onClick={() => toggleWishHandler(id, token)}
              type="button"
              disabled={loading}
              aria-pressed={inWishlist}
              className={`flex cursor-pointer h-8 w-8 items-center justify-center rounded-full shadow-sm transition-colors disabled:opacity-60 ${
                inWishlist
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-white text-[#4a5565] hover:text-red-500"
              }`}
            >
              {inWishlist ? <IconHeartFilled className="h-4 w-4" /> : <IconHeart className="h-4 w-4" />}
            </button>
    </>
  )
}
