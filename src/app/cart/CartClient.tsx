"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import AuthLayout from "@/src/components/auth/AuthLayout";
import { Spinner } from "@/components/ui/spinner";
import {
  IconShoppingCart,
  IconMinus,
  IconPlus,
  IconTrash,
  IconArrowLeft,
  IconTruck,
  IconTag,
  IconLock,
  IconShieldCheck,
} from "@/src/components/auth/icons";
import type { CartI, CartProductI } from "@/src/types/cartType";
import { useCounts } from "@/src/context/CountsContext";

// Orders at or above this total ship for free (matches the promo bar in the navbar)
const FREE_SHIPPING_MIN = 500;

function formatPrice(value: number) {
  return value.toLocaleString("en-US");
}

export default function CartClient({
  initialCart,
  isLoggedIn,
  onUpdate,
  onRemove,
  onClear,
}: {
  initialCart: CartI | null;
  isLoggedIn: boolean;
  onUpdate: (productId: string, count: number) => Promise<CartI>;
  onRemove: (productId: string) => Promise<CartI>;
  onClear: () => Promise<void>;
}) {
  const [cart, setCart] = useState<CartI | null>(initialCart);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartProductI | null>(null);
  const { setCartCount } = useCounts();

  const items = cart?.products ?? [];
  const totalPrice = cart?.totalCartPrice ?? 0;
  const hasFreeShipping = totalPrice >= FREE_SHIPPING_MIN;

  async function handleUpdate(productId: string, count: number) {
    if (count < 1) return;
    try {
      setLoadingId(productId);
      const updated = await onUpdate(productId, count);
      setCart(updated);
      setCartCount(updated.products.length);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update item");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleConfirmRemove() {
    if (!selectedItem) return;
    const productId = selectedItem.product._id;
    setSelectedItem(null);
    try {
      setLoadingId(productId);
      const updated = await onRemove(productId);
      setCart(updated);
      setCartCount(updated.products.length);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to remove item");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleConfirmClear() {
    setShowClearModal(false);
    try {
      await onClear();
      setCart((prev) => (prev ? { ...prev, products: [], totalCartPrice: 0 } : prev));
      setCartCount(0);
      toast.success("Cart cleared");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to clear cart");
    }
  }

  return (
    <AuthLayout>
      <div className="bg-[#f9fafb] min-h-[60vh]">
        {/* Breadcrumb */}
        <div className="px-[120px] pt-6 text-sm text-[#4a5565]">
          <Link href="/" className="hover:text-[#16a34a]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-[#101828]">Shopping Cart</span>
        </div>

        {/* Page title */}
        <div className="px-[120px] pt-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#16a34a] to-[#15803d] shadow-sm">
              <IconShoppingCart className="h-6 w-6 text-white" />
            </span>
            <h1 className="text-3xl font-bold text-[#101828]">Shopping Cart</h1>
          </div>
          <p className="mt-2 text-base text-[#4a5565]">
            You have{" "}
            <span className="font-semibold text-[#16a34a]">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>{" "}
            in your cart
          </p>
        </div>

        {!isLoggedIn ? (
          <EmptyState
            title="You're not logged in"
            text="Login to see the items in your cart."
            href="/auth/login"
            action="Login"
          />
        ) : items.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            text="Looks like you haven't added anything yet."
            href="/products"
            action="Start Shopping"
          />
        ) : (
          <div className="flex items-start gap-6 px-[120px] py-6">
            {/* Left side: cart items list */}
            <div className="flex flex-1 flex-col gap-4">
              {items.map((item) => {
                const isBusy = loadingId === item.product._id;
                const inStock = item.product.quantity === undefined || item.product.quantity > 0;
                return (
                  <div
                    key={item._id}
                    className="flex gap-5 rounded-2xl border border-[#f3f4f6] bg-white p-5 shadow-sm"
                  >
                    {/* Image with stock badge */}
                    <div className="relative shrink-0">
                      <div className="relative h-28 w-28 overflow-hidden rounded-xl border border-[#f3f4f6] bg-[#f9fafb]">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          sizes="112px"
                          className="object-contain p-3"
                        />
                      </div>
                      <span
                        className={`absolute -bottom-2 -right-2 flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold text-white ${
                          inStock ? "bg-[#00c950]" : "bg-[#fb2c36]"
                        }`}
                      >
                        {inStock ? "✓ In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#101828]">
                        {item.product.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-xs">
                        {item.product.category?.name && (
                          <span className="rounded-full bg-[#f0fdf4] px-2.5 py-1 font-medium text-[#15803d]">
                            {item.product.category.name}
                          </span>
                        )}
                        <span className="text-[#99a1af]">•</span>
                        <span className="text-[#6a7282]">
                          SKU: {item.product._id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                      <p className="mt-3 text-lg font-bold text-[#16a34a]">
                        {formatPrice(item.price)} EGP{" "}
                        <span className="text-xs font-normal text-[#99a1af]">per unit</span>
                      </p>

                      <div className="mt-3 flex w-fit items-center gap-1 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-1">
                        <button suppressHydrationWarning
                          type="button"
                          disabled={isBusy || item.count <= 1}
                          onClick={() => handleUpdate(item.product._id, item.count - 1)}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-white text-[#4a5565] shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <IconMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="flex w-10 justify-center text-base font-bold text-[#101828]">
                          {isBusy ? <Spinner /> : item.count}
                        </span>
                        <button suppressHydrationWarning
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleUpdate(item.product._id, item.count + 1)}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-[#16a34a] text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <IconPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Line total + remove */}
                    <div className="flex items-end gap-4 self-end">
                      <div className="text-right">
                        <span className="block text-xs text-[#99a1af]">Total</span>
                        <span className="text-xl font-bold text-[#101828]">
                          {formatPrice(item.price * item.count)}{" "}
                          <span className="text-sm font-normal text-[#99a1af]">EGP</span>
                        </span>
                      </div>
                      <button suppressHydrationWarning
                        type="button"
                        disabled={isBusy}
                        onClick={() => setSelectedItem(item)}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#ffc9c9] bg-[#fef2f2] text-[#fb2c36] hover:bg-[#ffe2e2] disabled:opacity-50"
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="mt-2 flex items-center justify-between border-t border-[#e5e7eb] pt-6">
                <Link
                  href="/products"
                  className="flex items-center gap-2 text-sm font-medium text-[#16a34a]"
                >
                  <IconArrowLeft className="h-3.5 w-3.5" />
                  Continue Shopping
                </Link>
                <button suppressHydrationWarning
                  type="button"
                  onClick={() => setShowClearModal(true)}
                  className="flex cursor-pointer items-center gap-2 text-sm text-[#6a7282] hover:text-[#fb2c36]"
                >
                  <IconTrash className="h-4 w-4" />
                  Clear all items
                </button>
              </div>
            </div>

            {/* Right side: order summary card */}
            <div className="w-[380px] shrink-0 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
              <div className="bg-gradient-to-r from-[#16a34a] to-[#15803d] px-6 py-4">
                <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                  <IconShoppingCart className="h-5 w-5" />
                  Order Summary
                </h2>
                <p className="mt-1 text-sm text-[#dcfce7]">
                  {items.length} {items.length === 1 ? "item" : "items"} in your cart
                </p>
              </div>

              <div className="flex flex-col gap-4 px-6 py-6">
                {/* Free shipping banner */}
                <div className="flex items-center gap-3 rounded-xl bg-[#f0fdf4] p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dcfce7]">
                    <IconTruck className="h-5 w-5 text-[#16a34a]" />
                  </span>
                  {hasFreeShipping ? (
                    <div>
                      <p className="text-sm font-bold text-[#15803d]">Free Shipping!</p>
                      <p className="text-xs text-[#16a34a]">You qualify for free delivery</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm font-bold text-[#15803d]">Almost there!</p>
                      <p className="text-xs text-[#16a34a]">
                        Add {formatPrice(FREE_SHIPPING_MIN - totalPrice)} EGP more for free delivery
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#4a5565]">Subtotal</span>
                  <span className="font-medium text-[#1e2939]">{formatPrice(totalPrice)} EGP</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#4a5565]">Shipping</span>
                  {hasFreeShipping ? (
                    <span className="font-semibold text-[#16a34a]">FREE</span>
                  ) : (
                    <span className="font-medium text-[#6a7282]">Calculated at checkout</span>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-dashed border-[#e5e7eb] pt-4">
                  <span className="text-base font-bold text-[#1e2939]">Total</span>
                  <span className="text-2xl font-bold text-[#101828]">
                    {formatPrice(totalPrice)}{" "}
                    <span className="text-sm font-normal text-[#6a7282]">EGP</span>
                  </span>
                </div>

                {/* TODO: open a promo code input */}
                <button suppressHydrationWarning
                  type="button"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[#d1d5dc] py-3 text-sm text-[#364153] hover:border-[#16a34a] hover:text-[#16a34a]"
                >
                  <IconTag className="h-4 w-4" />
                  Apply Promo Code
                </button>

                <Link
                  href="/checkout"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16a34a] to-[#15803d] py-3.5 text-base font-semibold text-white shadow-lg shadow-[#16a34a]/30 hover:opacity-95"
                >
                  <IconLock className="h-4 w-4" />
                  Secure Checkout
                </Link>

                <div className="flex items-center justify-center gap-4 text-xs text-[#4a5565]">
                  <span className="flex items-center gap-1.5">
                    <IconShieldCheck className="h-3.5 w-3.5 text-[#16a34a]" />
                    Secure Payment
                  </span>
                  <span className="h-3 w-px bg-[#d1d5dc]" />
                  <span className="flex items-center gap-1.5">
                    <IconTruck className="h-3.5 w-3.5 text-[#2b7fff]" />
                    Fast Delivery
                  </span>
                </div>

                <Link
                  href="/products"
                  className="mt-2 text-center text-sm font-medium text-[#16a34a] hover:underline"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Clear cart confirm popup */}
        {showClearModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-[420px] rounded-2xl bg-white p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fef2f2]">
                <IconShoppingCart className="h-7 w-7 text-[#fb2c36]" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#1e2939]">Clear Your Cart?</h3>
              <p className="mt-2 text-sm text-[#6a7282]">
                All items will be removed from your cart. This action cannot be undone.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button suppressHydrationWarning
                  type="button"
                  onClick={() => setShowClearModal(false)}
                  className="flex-1 rounded-lg bg-[#f3f4f6] py-2.5 text-sm font-semibold text-[#1e2939]"
                >
                  Keep Shopping
                </button>
                <button suppressHydrationWarning
                  type="button"
                  onClick={handleConfirmClear}
                  className="flex-1 rounded-lg bg-[#fb2c36] py-2.5 text-sm font-semibold text-white"
                >
                  Yes, Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Remove item confirm popup */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-[420px] rounded-2xl bg-white p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fef2f2]">
                <IconTrash className="h-7 w-7 text-[#fb2c36]" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-[#1e2939]">Remove Item?</h3>
              <p className="mt-2 text-sm text-[#6a7282]">
                Remove{" "}
                <span className="font-semibold text-[#1e2939]">{selectedItem.product.title}</span>{" "}
                from your cart?
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button suppressHydrationWarning
                  type="button"
                  onClick={() => setSelectedItem(null)}
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
      </div>
    </AuthLayout>
  );
}

function EmptyState({
  title,
  text,
  href,
  action,
}: {
  title: string;
  text: string;
  href: string;
  action: string;
}) {
  return (
    <div className="mx-[120px] my-6 flex flex-col items-center gap-3 rounded-xl border border-[#e5e7eb] bg-white py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#dcfce7]">
        <IconShoppingCart className="h-7 w-7 text-[#16a34a]" />
      </span>
      <h2 className="text-xl font-bold text-[#1e2939]">{title}</h2>
      <p className="text-sm text-[#6a7282]">{text}</p>
      <Link
        href={href}
        className="mt-2 rounded-lg bg-[#16a34a] px-6 py-2.5 text-sm font-semibold text-white"
      >
        {action}
      </Link>
    </div>
  );
}
