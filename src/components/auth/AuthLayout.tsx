"use client";
import { useState } from "react";
import Link from "next/link";
import { Exo } from "next/font/google";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import {
  IconTruck,
  IconSparkles,
  IconPhone,
  IconMail,
  IconChevronDown,
  IconSearch,
  IconHeadset,
  IconHeart,
  IconShoppingCart,
  IconUser,
  IconUserPlus,
  IconArrowPath,
  IconShieldCheck,
  IconMapPin,
  IconCreditCard,
  IconFacebook,
  IconTwitter,
  IconInstagram,
  IconYoutube,
  IconMenu,
  IconX,
} from "./icons";
import { useSession } from "next-auth/react";
import { useCounts } from "@/src/context/CountsContext";

// The Figma design uses the "Exo" font, so we load it here with next/font/google.
const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type AuthLayoutProps = {
  children: React.ReactNode;
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
  { href: "/brands", label: "Brands" },
];

function SearchBox({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <input suppressHydrationWarning
        type="text"
        placeholder="Search for products, brands and more..."
        readOnly
        className="w-full rounded-full border border-[#e5e7eb] bg-[#f9fafb]/50 py-3 pl-5 pr-12 text-sm text-[#364153] placeholder:text-[#364153]/50"
      />
      {/* TODO: wire up product search */}
      <button suppressHydrationWarning
        type="button"
        className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#16a34a] text-white"
      >
        <IconSearch className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const userData = useSession();
  const { cartCount, wishlistCount } = useCounts();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="{exo.className} ">
      {/* Top promo bar (desktop only) */}
      <div className="hidden border-b border-[#f3f4f6] px-10 lg:block xl:px-[120px]">
        <div className="flex h-10 items-center justify-between text-sm text-[#6a7282]">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <IconTruck className="h-3 w-3.5" />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="hidden items-center gap-2 xl:flex">
              <IconSparkles className="h-3 w-3.5" />
              New Arrivals Daily
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 xl:flex">
              <IconPhone className="h-3 w-3.5" />
              +1 (800) 123-4567
            </span>
            <a href="mailto:support@freshcart.com" className="flex items-center gap-1.5">
              <IconMail className="h-3 w-3.5" />
              support@freshcart.com
            </a>
            <span className="h-4 w-px bg-[#e5e7eb]" />
            <Link href="/auth/login" className="flex items-center gap-1.5 text-[#4a5565]">
              <IconUser className="h-3 w-3.5" />
              Sign In
            </Link>
            <Link href="/auth/register" className="flex items-center gap-1.5 text-[#4a5565]">
              <IconUserPlus className="h-3 w-3.5" />
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-10 xl:px-[120px]">
          <div className="flex h-16 items-center justify-between gap-3 lg:h-[72px] lg:gap-8">
            <div className="flex shrink-0 items-center gap-1">
              <button suppressHydrationWarning
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((prev) => !prev)}
                className="-ml-2 rounded-full p-2 text-[#364153] lg:hidden"
              >
                {menuOpen ? <IconX className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
              </button>
              <Link href="/" className="shrink-0">
                <Logo />
              </Link>
            </div>

            <SearchBox className="hidden max-w-[672px] flex-1 md:block" />

            <nav className="hidden items-center gap-6 text-base text-[#364153] lg:flex">
              <Link href="/">Home</Link>
              <Link href="/products">Shop</Link>
              <Link href="/categories" className="flex items-center gap-1.5">
                Categories
                <IconChevronDown className="h-2.5 w-2.5" />
              </Link>
              <Link href="/brands">Brands</Link>
            </nav>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <Link href="/support" className="hidden items-center gap-2 border-r border-[#e5e7eb] pr-3 xl:flex">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0fdf4]">
                  <IconHeadset className="h-4 w-4 text-[#364153]" />
                </span>
                <span className="text-xs">
                  <div className="text-[#99a1af]">Support</div>
                  <div className="font-semibold text-[#364153]">24/7 Help</div>
                </span>
              </Link>
              <Link href="/wishlist" className="relative rounded-full p-2.5">
                <IconHeart className="h-5 w-5 text-[#364153]" />
                {wishlistCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#fb2c36] px-1 text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link href="/cart" className="relative rounded-full p-2.5">
                <IconShoppingCart className="h-5 w-5 text-[#364153]" />
                {cartCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#fb2c36] px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
              {userData?.data?.user ? (
                <UserMenu name={userData.data.user.name} email={userData.data.user.email} />
              ) : (
                <Link
                  href="/auth/login"
                  aria-label="Sign In"
                  className="flex items-center gap-2 rounded-full bg-[#16a34a] p-2.5 text-sm font-semibold text-white shadow-sm sm:px-5"
                >
                  <IconUser className="h-3 w-3.5" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}
            </div>
          </div>

          {/* Search on small screens */}
          <div className="pb-3 md:hidden">
            <SearchBox />
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="border-t border-[#f3f4f6] px-4 py-3 sm:px-6 lg:hidden">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-base text-[#364153] hover:bg-[#f0fdf4]"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/support"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-base text-[#364153] hover:bg-[#f0fdf4]"
            >
              <IconHeadset className="h-4 w-4" />
              24/7 Support
            </Link>
            {!userData?.data?.user && (
              <div className="mt-2 flex gap-2 border-t border-[#f3f4f6] pt-3">
                <Link href="/auth/login" className="flex-1 rounded-full border border-[#16a34a] py-2 text-center text-sm font-semibold text-[#16a34a]">
                  Sign In
                </Link>
                <Link href="/auth/register" className="flex-1 rounded-full bg-[#16a34a] py-2 text-center text-sm font-semibold text-white">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        )}
      </header>

      <main>{children}</main>

      {/* Trust badges strip */}
      <div className="border-y border-[#dcfce7] bg-[#f0fdf4] px-4 py-6 sm:px-6 lg:px-10 xl:px-[120px]">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#dcfce7]">
              <IconTruck className="h-4.5 w-4.5 text-[#16a34a]" />
            </span>
            <div>
              <h4 className="text-sm font-semibold text-[#101828]">Free Shipping</h4>
              <p className="text-xs text-[#6a7282]">On orders over 500 EGP</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#dcfce7]">
              <IconArrowPath className="h-4.5 w-4.5 text-[#16a34a]" />
            </span>
            <div>
              <h4 className="text-sm font-semibold text-[#101828]">Easy Returns</h4>
              <p className="text-xs text-[#6a7282]">14-day return policy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#dcfce7]">
              <IconShieldCheck className="h-4.5 w-4.5 text-[#16a34a]" />
            </span>
            <div>
              <h4 className="text-sm font-semibold text-[#101828]">Secure Payment</h4>
              <p className="text-xs text-[#6a7282]">100% secure checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#dcfce7]">
              <IconHeadset className="h-4.5 w-4.5 text-[#16a34a]" />
            </span>
            <div>
              <h4 className="text-sm font-semibold text-[#101828]">24/7 Support</h4>
              <p className="text-xs text-[#6a7282]">Contact us anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#101828] pt-12">
        <div className="mx-auto grid max-w-[1504px] grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-12 lg:px-10 xl:px-[120px]">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <a href="#" className="inline-block rounded-lg bg-white px-4 py-2">
              <Logo />
            </a>
            <p className="mt-5 text-sm text-[#99a1af]">
              FreshCart is your one-stop destination for quality products. From fashion to
              electronics, we bring you the best brands at competitive prices with a seamless
              shopping experience.
            </p>
            <div className="mt-5 space-y-3 text-sm text-[#99a1af]">
              <div className="flex items-center gap-3">
                <IconPhone className="h-3.5 w-3.5" />
                +1 (800) 123-4567
              </div>
              <a href="mailto:support@freshcart.com" className="flex items-center gap-3">
                <IconMail className="h-3.5 w-3.5" />
                support@freshcart.com
              </a>
              <div className="flex items-start gap-3">
                <IconMapPin className="h-3.5 w-3.5 shrink-0" />
                123 Commerce Street, New York, NY 10001
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e2939] text-white">
                <IconFacebook className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e2939] text-white">
                <IconTwitter className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e2939] text-white">
                <IconInstagram className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e2939] text-white">
                <IconYoutube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Shop</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#99a1af]">
              <li><a href="#">All Products</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Brands</a></li>
              <li><a href="#">Electronics</a></li>
              <li><a href="#">{`Men's Fashion`}</a></li>
              <li><a href="#">{`Women's Fashion`}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Account</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#99a1af]">
              <li><a href="#">My Account</a></li>
              <li><Link href="/allorders">Order History</Link></li>
              <li><a href="#">Wishlist</a></li>
              <li><a href="#">Shopping Cart</a></li>
              <li><Link href="/auth/login">Sign In</Link></li>
              <li><Link href="/auth/register">Create Account</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#99a1af]">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Shipping Info</a></li>
              <li><a href="#">{`Returns & Refunds`}</a></li>
              <li><a href="#">Track Order</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="mt-5 space-y-3 text-sm text-[#99a1af]">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#1e2939] px-4 py-6 sm:px-6 lg:px-10 xl:px-[208px]">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <p className="text-sm text-[#6a7282]">© 2026 FreshCart. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm text-[#6a7282]">
              <span className="flex items-center gap-2">
                <IconCreditCard className="h-3.5 w-3.5" />
                Visa
              </span>
              <span className="flex items-center gap-2">
                <IconCreditCard className="h-3.5 w-3.5" />
                Mastercard
              </span>
              <span className="flex items-center gap-2">
                <IconCreditCard className="h-3.5 w-3.5" />
                PayPal
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
