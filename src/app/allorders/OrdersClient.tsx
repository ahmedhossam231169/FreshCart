"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthLayout from "@/src/components/auth/AuthLayout";
import {
  IconArrowLeft,
  IconBanknote,
  IconBox,
  IconCheckCircle,
  IconChevronDown,
  IconClock,
  IconCreditCard,
  IconMapPin,
  IconPhone,
  IconShoppingBag,
  IconTruck,
} from "@/src/components/auth/icons";
import type { OrderI } from "@/src/types/orderType";

function formatPrice(value: number) {
  return value.toLocaleString("en-US");
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function OrdersClient({
  orders,
  isLoggedIn,
  loadFailed,
}: {
  orders: OrderI[];
  isLoggedIn: boolean;
  loadFailed: boolean;
}) {
  // The newest order starts expanded
  const [openId, setOpenId] = useState<string | null>(orders[0]?._id ?? null);

  return (
    <AuthLayout>
      <div className="min-h-[60vh] bg-[#f9fafb] pb-12">
        {/* Breadcrumb */}
        <div className="px-[120px] pt-6 text-sm text-[#4a5565]">
          <Link href="/" className="hover:text-[#16a34a]">
            Home
          </Link>
          <span className="mx-2 text-[#d1d5dc]">/</span>
          <span className="font-medium text-[#101828]">My Orders</span>
        </div>

        {/* Page title */}
        <div className="flex items-end justify-between px-[120px] pt-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#16a34a] to-[#15803d] shadow-sm">
                <IconBox className="h-6 w-6 text-white" />
              </span>
              <h1 className="text-3xl font-bold text-[#101828]">My Orders</h1>
            </div>
            <p className="mt-3 text-base text-[#4a5565]">
              Track and manage your{" "}
              <span className="font-semibold text-[#16a34a]">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </span>
            </p>
          </div>
          <Link
            href="/products"
            className="mb-6 flex items-center gap-2 text-sm font-medium text-[#16a34a] hover:underline"
          >
            <IconArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {!isLoggedIn ? (
          <EmptyState
            title="You're not logged in"
            text="Login to see your orders."
            href="/auth/login"
            action="Login"
          />
        ) : loadFailed ? (
          <EmptyState
            title="Couldn't load your orders"
            text="Something went wrong. Please refresh the page and try again."
            href="/allorders"
            action="Try Again"
          />
        ) : orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            text="When you place an order, it will show up here."
            href="/products"
            action="Start Shopping"
          />
        ) : (
          <div className="flex flex-col gap-5 px-[120px] pt-8">
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                isOpen={openId === order._id}
                onToggle={() => setOpenId(openId === order._id ? null : order._id)}
              />
            ))}
          </div>
        )}
      </div>
    </AuthLayout>
  );
}

function OrderCard({
  order,
  isOpen,
  onToggle,
}: {
  order: OrderI;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const isCash = order.paymentMethodType === "cash";
  const itemCount = order.cartItems.reduce((sum, item) => sum + item.count, 0);
  const subtotal = order.cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
      {/* Summary row (click to expand) */}
      <button
        type="button"
        suppressHydrationWarning
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center gap-5 p-5 text-left hover:bg-[#f9fafb]"
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4]">
          <IconShoppingBag className="h-6 w-6 text-[#16a34a]" />
        </span>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-[#101828]">Order #{order.id}</h3>
            {order.isDelivered ? (
              <StatusBadge className="bg-[#dcfce7] text-[#15803d]">
                <IconCheckCircle className="h-3.5 w-3.5" />
                Delivered
              </StatusBadge>
            ) : (
              <StatusBadge className="bg-[#fef3c6] text-[#bb4d00]">
                <IconClock className="h-3.5 w-3.5" />
                Processing
              </StatusBadge>
            )}
            {order.isPaid ? (
              <StatusBadge className="bg-[#dbeafe] text-[#1447e6]">Paid</StatusBadge>
            ) : (
              <StatusBadge className="bg-[#f3f4f6] text-[#4a5565]">Unpaid</StatusBadge>
            )}
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[#6a7282]">
            <span>{formatDate(order.createdAt)}</span>
            <span className="text-[#d1d5dc]">•</span>
            <span>
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
            <span className="text-[#d1d5dc]">•</span>
            <span className="flex items-center gap-1">
              {isCash ? <IconBanknote className="h-4 w-4" /> : <IconCreditCard className="h-4 w-4" />}
              {isCash ? "Cash on Delivery" : "Paid Online"}
            </span>
          </p>
        </div>

        {/* Product thumbnails */}
        <div className="flex -space-x-3">
          {order.cartItems.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="relative h-11 w-11 overflow-hidden rounded-lg border-2 border-white bg-[#f9fafb] shadow-sm"
            >
              <Image
                src={item.product.imageCover}
                alt={item.product.title}
                fill
                sizes="44px"
                className="object-contain p-0.5"
              />
            </div>
          ))}
          {order.cartItems.length > 3 && (
            <span className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-white bg-[#f3f4f6] text-xs font-semibold text-[#4a5565]">
              +{order.cartItems.length - 3}
            </span>
          )}
        </div>

        <div className="w-[130px] text-right">
          <span className="block text-xs text-[#99a1af]">Total</span>
          <span className="text-xl font-bold text-[#16a34a]">
            {formatPrice(order.totalOrderPrice)}{" "}
            <span className="text-xs font-normal text-[#6a7282]">EGP</span>
          </span>
        </div>

        <IconChevronDown
          className={`h-5 w-5 shrink-0 text-[#6a7282] transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Details */}
      {isOpen && (
        <div className="flex gap-6 border-t border-[#f3f4f6] bg-[#fcfcfd] p-5">
          {/* Items */}
          <ul className="flex flex-1 flex-col gap-3">
            {order.cartItems.map((item) => (
              <li
                key={item._id}
                className="flex items-center gap-4 rounded-xl border border-[#f3f4f6] bg-white p-3"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#f9fafb]">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${item.product._id}`}
                    className="block truncate text-sm font-semibold text-[#101828] hover:text-[#16a34a]"
                  >
                    {item.product.title}
                  </Link>
                  <p className="mt-0.5 text-xs text-[#6a7282]">
                    {[item.product.category?.name, item.product.brand?.name].filter(Boolean).join(" • ")}
                  </p>
                  <p className="mt-1 text-xs text-[#6a7282]">
                    {item.count} × {formatPrice(item.price)} EGP
                  </p>
                </div>
                <span className="text-sm font-bold text-[#101828]">
                  {formatPrice(item.price * item.count)} EGP
                </span>
              </li>
            ))}
          </ul>

          {/* Address + price summary */}
          <div className="flex w-[340px] shrink-0 flex-col gap-4">
            {order.shippingAddress && (
              <div className="rounded-xl border border-[#f3f4f6] bg-white p-4">
                <h4 className="flex items-center gap-2 text-sm font-semibold text-[#101828]">
                  <IconTruck className="h-4 w-4 text-[#16a34a]" />
                  Shipping Address
                </h4>
                <p className="mt-3 flex items-start gap-2 text-sm text-[#4a5565]">
                  <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#99a1af]" />
                  <span>
                    {order.shippingAddress.details}, {order.shippingAddress.city}
                  </span>
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-[#4a5565]">
                  <IconPhone className="h-4 w-4 shrink-0 text-[#99a1af]" />
                  {order.shippingAddress.phone}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2.5 rounded-xl border border-[#f3f4f6] bg-white p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[#4a5565]">Subtotal</span>
                <span className="font-medium text-[#1e2939]">{formatPrice(subtotal)} EGP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4a5565]">Shipping</span>
                {order.shippingPrice > 0 ? (
                  <span className="font-medium text-[#1e2939]">{formatPrice(order.shippingPrice)} EGP</span>
                ) : (
                  <span className="font-semibold text-[#16a34a]">FREE</span>
                )}
              </div>
              {order.taxPrice > 0 && (
                <div className="flex justify-between">
                  <span className="text-[#4a5565]">Tax</span>
                  <span className="font-medium text-[#1e2939]">{formatPrice(order.taxPrice)} EGP</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#f3f4f6] pt-2.5">
                <span className="font-bold text-[#101828]">Total</span>
                <span className="font-bold text-[#16a34a]">{formatPrice(order.totalOrderPrice)} EGP</span>
              </div>
              {order.isPaid && order.paidAt && (
                <p className="text-xs text-[#6a7282]">Paid on {formatDate(order.paidAt)}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}>
      {children}
    </span>
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
        <IconBox className="h-7 w-7 text-[#16a34a]" />
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
