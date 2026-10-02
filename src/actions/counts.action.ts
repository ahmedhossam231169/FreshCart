"use server";

import { getServerToken } from "@/lib/Token";
import { displayCartService } from "@/src/services/cart.service";
import { getToWishList } from "@/src/services/wishList.service";

export async function getCountsAction() {
  const decodedToken = await getServerToken();
  const accessToken = decodedToken?.accessToken;
  if (!accessToken) return { cartCount: 0, wishlistCount: 0 };

  const [cart, wishlist] = await Promise.allSettled([
    displayCartService(accessToken),
    getToWishList(accessToken),
  ]);

  return {
    cartCount: cart.status === "fulfilled" ? cart.value.numOfCartItems ?? 0 : 0,
    wishlistCount:
      wishlist.status === "fulfilled" ? wishlist.value?.data?.length ?? 0 : 0,
  };
}
