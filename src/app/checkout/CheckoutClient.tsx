"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import AuthLayout from "@/src/components/auth/AuthLayout";
import { Spinner } from "@/components/ui/spinner";
import {
  IconArrowLeft,
  IconArrowUturnLeft,
  IconBanknote,
  IconBuilding,
  IconCheck,
  IconCreditCard,
  IconHome,
  IconInfo,
  IconMapPin,
  IconPhone,
  IconReceipt,
  IconShieldCheck,
  IconShoppingBag,
  IconShoppingCart,
  IconTruck,
} from "@/src/components/auth/icons";
import { checkoutSchema, type CheckoutSchemaType } from "@/lib/schema/checkoutSchema";
import type { CartI } from "@/src/types/cartType";
import { useCounts } from "@/src/context/CountsContext";

type PaymentMethod = "cash" | "online";

function formatPrice(value: number) {
  return value.toLocaleString("en-US");
}

export default function CheckoutClient({
  cart,
  isLoggedIn,
  onCashOrder,
  onOnlinePayment,
}: {
  cart: CartI | null;
  isLoggedIn: boolean;
  onCashOrder: (cartId: string, shippingAddress: CheckoutSchemaType) => Promise<void>;
  onOnlinePayment: (cartId: string, shippingAddress: CheckoutSchemaType) => Promise<string>;
}) {
  const router = useRouter();
  const { setCartCount } = useCounts();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { city: "", details: "", phone: "" },
  });

  const items = cart?.products ?? [];
  const totalPrice = cart?.totalCartPrice ?? 0;

  async function onSubmit(values: CheckoutSchemaType) {
    if (!cart) return;
    try {
      if (paymentMethod === "cash") {
        await onCashOrder(cart._id, values);
        setCartCount(0);
        toast.success("Order placed successfully!");
        router.push("/allorders");
      } else {
        // Stripe hosts the card form, so leave the app and come back after paying
        const url = await onOnlinePayment(cart._id, values);
        window.location.assign(url);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to place order");
    }
  }

  return (
    <AuthLayout>
      <div className="min-h-[60vh] bg-[#f9fafb] pb-12">
        {/* Breadcrumb */}
        <div className="px-[120px] pt-6 text-sm text-[#4a5565]">
          <Link href="/" className="hover:text-[#16a34a]">
            Home
          </Link>
          <span className="mx-2 text-[#d1d5dc]">/</span>
          <Link href="/cart" className="hover:text-[#16a34a]">
            Cart
          </Link>
          <span className="mx-2 text-[#d1d5dc]">/</span>
          <span className="font-medium text-[#101828]">Checkout</span>
        </div>

        {/* Page title */}
        <div className="flex items-end justify-between px-[120px] pt-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#16a34a] to-[#15803d] shadow-sm">
                <IconReceipt className="h-6 w-6 text-white" />
              </span>
              <h1 className="text-3xl font-bold text-[#101828]">Complete Your Order</h1>
            </div>
            <p className="mt-3 text-base text-[#4a5565]">
              Review your items and complete your purchase
            </p>
          </div>
          <Link
            href="/cart"
            className="mb-6 flex items-center gap-2 text-sm font-medium text-[#16a34a] hover:underline"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
        </div>

        {!isLoggedIn ? (
          <EmptyState
            title="You're not logged in"
            text="Login to complete your order."
            href="/auth/login"
            action="Login"
          />
        ) : items.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            text="Add some products to your cart before checking out."
            href="/products"
            action="Start Shopping"
          />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex items-start gap-8 px-[120px] pt-8"
          >
            {/* Left side: shipping + payment */}
            <div className="flex flex-1 flex-col gap-6">
              {/* Shipping address card */}
              <section className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
                <CardHeader
                  icon={<IconHome className="h-5 w-5" />}
                  title="Shipping Address"
                  subtitle="Where should we deliver your order?"
                />
                <div className="flex flex-col gap-5 p-6">
                  <div className="flex items-center gap-3 rounded-xl border border-[#bedbff] bg-[#eff6ff] px-4 py-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#dbeafe]">
                      <IconInfo className="h-4 w-4 text-[#155dfc]" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#1447e6]">Delivery Information</p>
                      <p className="text-xs text-[#155dfc]">
                        Please ensure your address is accurate for smooth delivery
                      </p>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="mb-2 block text-sm font-medium text-[#364153]">
                      City <span className="text-[#fb2c36]">*</span>
                    </label>
                    <InputBox hasError={!!errors.city}>
                      <InputIcon>
                        <IconBuilding className="h-4 w-4" />
                      </InputIcon>
                      <input
                        id="city"
                        suppressHydrationWarning
                        {...register("city")}
                        placeholder="e.g. Cairo, Alexandria, Giza"
                        className="flex-1 bg-transparent text-sm text-[#101828] outline-none placeholder:text-[#99a1af]"
                      />
                    </InputBox>
                    {errors.city && <FieldError>{errors.city.message}</FieldError>}
                  </div>

                  {/* Street address */}
                  <div>
                    <label htmlFor="details" className="mb-2 block text-sm font-medium text-[#364153]">
                      Street Address <span className="text-[#fb2c36]">*</span>
                    </label>
                    <InputBox hasError={!!errors.details} alignTop>
                      <InputIcon>
                        <IconMapPin className="h-4 w-4" />
                      </InputIcon>
                      <textarea
                        id="details"
                        suppressHydrationWarning
                        rows={3}
                        {...register("details")}
                        placeholder="Street name, building number, floor, apartment..."
                        className="mt-1 flex-1 resize-none bg-transparent text-sm text-[#101828] outline-none placeholder:text-[#99a1af]"
                      />
                    </InputBox>
                    {errors.details && <FieldError>{errors.details.message}</FieldError>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#364153]">
                      Phone Number <span className="text-[#fb2c36]">*</span>
                    </label>
                    <InputBox hasError={!!errors.phone}>
                      <InputIcon>
                        <IconPhone className="h-4 w-4" />
                      </InputIcon>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        maxLength={11}
                        suppressHydrationWarning
                        {...register("phone")}
                        placeholder="01xxxxxxxxx"
                        className="flex-1 bg-transparent text-sm text-[#101828] outline-none placeholder:text-[#99a1af]"
                      />
                      <span className="shrink-0 text-xs text-[#99a1af]">Egyptian numbers only</span>
                    </InputBox>
                    {errors.phone && <FieldError>{errors.phone.message}</FieldError>}
                  </div>
                </div>
              </section>

              {/* Payment method card */}
              <section className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
                <CardHeader
                  icon={<IconCreditCard className="h-5 w-5" />}
                  title="Payment Method"
                  subtitle="Choose how you'd like to pay"
                />
                <div role="radiogroup" className="flex flex-col gap-4 p-6">
                  <PaymentOption
                    selected={paymentMethod === "cash"}
                    onSelect={() => setPaymentMethod("cash")}
                    icon={<IconBanknote className="h-6 w-6" />}
                    title="Cash on Delivery"
                    text="Pay when your order arrives at your doorstep"
                  />
                  <PaymentOption
                    selected={paymentMethod === "online"}
                    onSelect={() => setPaymentMethod("online")}
                    icon={<IconCreditCard className="h-6 w-6" />}
                    title="Pay Online"
                    text="Secure payment with Credit/Debit Card via Stripe"
                  >
                    <span className="mt-2 flex items-center gap-1.5">
                      <CardBadge className="bg-[#1a1f71]">VISA</CardBadge>
                      <CardBadge className="bg-[#eb001b]">MC</CardBadge>
                      <CardBadge className="bg-[#2e77bc]">AMEX</CardBadge>
                    </span>
                  </PaymentOption>

                  <div className="flex items-center gap-3 rounded-xl bg-[#f0fdf4] px-4 py-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#dcfce7]">
                      <IconShieldCheck className="h-4 w-4 text-[#16a34a]" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#15803d]">Secure &amp; Encrypted</p>
                      <p className="text-xs text-[#16a34a]">
                        Your payment info is protected with 256-bit SSL encryption
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right side: order summary */}
            <aside className="sticky top-6 w-[430px] shrink-0 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
              <div className="bg-gradient-to-r from-[#16a34a] to-[#15803d] px-6 py-5">
                <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                  <IconShoppingBag className="h-5 w-5" />
                  Order Summary
                </h2>
                <p className="mt-1 text-sm text-[#dcfce7]">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>

              <div className="flex flex-col gap-4 p-5">
                {/* Items list (scrolls when there are many items) */}
                <ul className="flex max-h-[200px] flex-col gap-3 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <li key={item._id} className="flex items-center gap-3 rounded-xl bg-[#f9fafb] p-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-[#f3f4f6] bg-white">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[#101828]">
                          {item.product.title}
                        </p>
                        <p className="text-xs text-[#6a7282]">
                          {item.count} × {formatPrice(item.price)} EGP
                        </p>
                      </div>
                      <span className="shrink-0 text-sm font-bold text-[#101828]">
                        {formatPrice(item.price * item.count)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3 border-t border-[#f3f4f6] pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#4a5565]">Subtotal</span>
                    <span className="font-medium text-[#1e2939]">{formatPrice(totalPrice)} EGP</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-[#4a5565]">
                      <IconTruck className="h-4 w-4 text-[#6a7282]" />
                      Shipping
                    </span>
                    <span className="font-semibold text-[#16a34a]">FREE</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#f3f4f6] pt-4">
                  <span className="text-base font-bold text-[#101828]">Total</span>
                  <span className="text-2xl font-bold text-[#16a34a]">
                    {formatPrice(totalPrice)}{" "}
                    <span className="text-xs font-normal text-[#6a7282]">EGP</span>
                  </span>
                </div>

                <button
                  type="submit"
                  suppressHydrationWarning
                  disabled={isSubmitting}
                  className="mt-1 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#16a34a] to-[#15803d] py-3.5 text-base font-semibold text-white shadow-lg shadow-[#16a34a]/30 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Spinner />
                  ) : paymentMethod === "cash" ? (
                    <IconShoppingBag className="h-4 w-4" />
                  ) : (
                    <IconCreditCard className="h-4 w-4" />
                  )}
                  {paymentMethod === "cash" ? "Place Order" : "Proceed to Payment"}
                </button>

                <div className="flex items-center justify-center gap-3 border-t border-[#f3f4f6] pt-4 text-xs text-[#6a7282]">
                  <span className="flex items-center gap-1.5">
                    <IconShieldCheck className="h-3.5 w-3.5 text-[#16a34a]" />
                    Secure
                  </span>
                  <span className="h-3 w-px bg-[#d1d5dc]" />
                  <span className="flex items-center gap-1.5">
                    <IconTruck className="h-3.5 w-3.5 text-[#2b7fff]" />
                    Fast Delivery
                  </span>
                  <span className="h-3 w-px bg-[#d1d5dc]" />
                  <span className="flex items-center gap-1.5">
                    <IconArrowUturnLeft className="h-3.5 w-3.5 text-[#ff6900]" />
                    Easy Returns
                  </span>
                </div>
              </div>
            </aside>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}

function CardHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="bg-gradient-to-r from-[#16a34a] to-[#15803d] px-6 py-5 text-white">
      <h2 className="flex items-center gap-2 text-lg font-bold">
        {icon}
        {title}
      </h2>
      <p className="mt-1 text-sm text-[#dcfce7]">{subtitle}</p>
    </div>
  );
}

function InputBox({
  hasError,
  alignTop,
  children,
}: {
  hasError: boolean;
  alignTop?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex gap-3 rounded-xl border px-3 py-2.5 focus-within:border-[#16a34a] focus-within:ring-2 focus-within:ring-[#16a34a]/15 ${
        alignTop ? "items-start" : "items-center"
      } ${hasError ? "border-[#fb2c36]" : "border-[#e5e7eb]"}`}
    >
      {children}
    </div>
  );
}

function InputIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f3f4f6] text-[#6a7282]">
      {children}
    </span>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-[#fb2c36]">{children}</p>;
}

function CardBadge({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <span className={`rounded px-1.5 py-0.5 text-[8px] font-bold text-white ${className}`}>
      {children}
    </span>
  );
}

function PaymentOption({
  selected,
  onSelect,
  icon,
  title,
  text,
  children,
}: {
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      suppressHydrationWarning
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border-2 p-4 text-left transition-colors ${
        selected ? "border-[#16a34a] bg-[#f0fdf4]" : "border-[#e5e7eb] bg-white hover:border-[#bbf7d0]"
      }`}
    >
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
          selected
            ? "bg-gradient-to-br from-[#16a34a] to-[#15803d] text-white shadow-md shadow-[#16a34a]/30"
            : "bg-[#f3f4f6] text-[#6a7282]"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1">
        <span className={`block text-base font-semibold ${selected ? "text-[#15803d]" : "text-[#101828]"}`}>
          {title}
        </span>
        <span className="block text-sm text-[#6a7282]">{text}</span>
        {children}
      </span>
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? "border-[#16a34a] bg-[#16a34a] text-white" : "border-[#d1d5dc]"
        }`}
      >
        {selected && <IconCheck className="h-3 w-3" />}
      </span>
    </button>
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
