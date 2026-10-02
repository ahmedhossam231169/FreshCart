"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getCountsAction } from "@/src/actions/counts.action";

type CountsContextType = {
  cartCount: number;
  wishlistCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  setWishlistCount: React.Dispatch<React.SetStateAction<number>>;
  refreshCounts: () => Promise<void>;
};

const CountsContext = createContext<CountsContextType | null>(null);

export default function CountsContextProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const refreshCounts = useCallback(async () => {
    const counts = await getCountsAction();
    setCartCount(counts.cartCount);
    setWishlistCount(counts.wishlistCount);
  }, []);

  // Reload the counts whenever the user logs in or out
  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated") {
      refreshCounts();
    } else {
      setCartCount(0);
      setWishlistCount(0);
    }
  }, [status, refreshCounts]);

  return (
    <CountsContext.Provider
      value={{ cartCount, wishlistCount, setCartCount, setWishlistCount, refreshCounts }}
    >
      {children}
    </CountsContext.Provider>
  );
}

export function useCounts() {
  const context = useContext(CountsContext);
  if (!context) throw new Error("useCounts must be used inside CountsContextProvider");
  return context;
}
