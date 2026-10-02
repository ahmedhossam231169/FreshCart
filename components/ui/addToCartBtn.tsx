"use client";

import { IconPlus } from '@/src/components/auth/icons'
import { Spinner } from '@/components/ui/spinner'
import { addToCart } from '@/src/services/cart.service';
import { useCounts } from '@/src/context/CountsContext';
import toast from 'react-hot-toast';

import React, { useState } from 'react'

type AddToCartBtnProps = {
  id: string;
  token: string;
  className?: string;
  children?: React.ReactNode;
};

export default function AddToCartBtn({ id, token, className, children }: AddToCartBtnProps) {
  const [isLoading, setisLoading] = useState(false)
  const { setCartCount } = useCounts()
  async function addToCartHandler(productId: string, userToken: string) {
    try {
      setisLoading(true)
      const data = await addToCart(userToken, productId);
      setCartCount(data.numOfCartItems);
      toast.success("Item added to your cart!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add item to cart.");
    }finally{
        setisLoading(false)
    }
  }
  return (
    <>
      <button suppressHydrationWarning onClick={() => addToCartHandler(id, token!)}
          type="button"
          disabled={isLoading}
          className={className ?? "flex h-9 w-9 cursor-pointer shrink-0 items-center justify-center rounded-full bg-[#16a34a] text-white"}
        >
          {isLoading ? <Spinner /> : (children ?? <IconPlus className="h-4 w-4" />)}
        </button>
    </>
  )
}
