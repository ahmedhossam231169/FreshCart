"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  IconUser,
  IconBox,
  IconHeart,
  IconMapPin,
  IconSettings,
  IconLogout,
} from "./icons";

type UserMenuProps = {
  name: string;
  email: string;
};

const menuLinks = [
  { href: "#", label: "My Profile", icon: IconUser },
  { href: "#", label: "My Orders", icon: IconBox },
  { href: "#", label: "My Wishlist", icon: IconHeart },
  { href: "#", label: "Addresses", icon: IconMapPin },
  { href: "#", label: "Settings", icon: IconSettings },
];

export default function UserMenu({ name, email }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button suppressHydrationWarning
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16a34a] text-white"
      >
        <IconUser className="h-4.5 w-4.5" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+12px)] z-20 w-72 rounded-2xl border border-[#f3f4f6] bg-white p-2 shadow-lg">
          <div className="flex items-center gap-2 rounded-xl px-1 py-1">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
              <IconUser className="h-6 w-6" />

            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-[#101828]">{name}</div>
              <div className="truncate text-xs text-[#6a7282]">{email}</div>
            </div>
          </div>

          <div className="my-1 h-px bg-[#f3f4f6]" />

          <nav className="py-1">
            {menuLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#364153] hover:bg-[#f9fafb]"
              >
                <Icon className="h-4 w-4 text-[#6a7282]" />
                {label}
              </Link>
            ))}
          </nav>

          <div className="my-1 h-px bg-[#f3f4f6]" />

          <button suppressHydrationWarning
            type="button"
            onClick={() => {
              setOpen(false);
              signOut();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#e7000b] hover:bg-[#fef2f2]"
          >
            <IconLogout className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
