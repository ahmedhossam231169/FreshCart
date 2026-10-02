import { getServerToken } from "@/lib/Token";
import {
  clearCartService,
  displayCartService,
  removeCartItemService,
  updateCartItemService,
} from "@/src/services/cart.service";
import type { CartI } from "@/src/types/cartType";
import CartClient from "./CartClient";

export default async function Cart() {
  const decodedToken = await getServerToken();
  const accessToken = decodedToken?.accessToken as string | undefined;

  async function updateItem(productId: string, count: number) {
    "use server";
    if (!accessToken) throw new Error("Please login first");
    const res = await updateCartItemService(accessToken, productId, count);
    return res.data;
  }

  async function removeItem(productId: string) {
    "use server";
    if (!accessToken) throw new Error("Please login first");
    const res = await removeCartItemService(accessToken, productId);
    return res.data;
  }

  async function clearCart() {
    "use server";
    if (!accessToken) throw new Error("Please login first");
    await clearCartService(accessToken);
  }

  let cart: CartI | null = null;
  if (accessToken) {
    try {
      const res = await displayCartService(accessToken);
      cart = res.data;
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  }

  return (
    <CartClient
      initialCart={cart}
      isLoggedIn={!!accessToken}
      onUpdate={updateItem}
      onRemove={removeItem}
      onClear={clearCart}
    />
  );
}
