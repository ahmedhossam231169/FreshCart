import { getServerToken } from "@/lib/Token";
import type { CheckoutSchemaType } from "@/lib/schema/checkoutSchema";
import { displayCartService } from "@/src/services/cart.service";
import { createCashOrder, createOnlineOrder } from "@/src/services/cheackout.service";
import type { CartI } from "@/src/types/cartType";
import CheckoutClient from "./CheckoutClient";

export default async function Checkout() {
  const decodedToken = await getServerToken();
  const accessToken = decodedToken?.accessToken as string | undefined;

  async function placeCashOrder(cartId: string, shippingAddress: CheckoutSchemaType) {
    "use server";
    if (!accessToken) throw new Error("Please login first");
    await createCashOrder(accessToken, cartId, shippingAddress);
  }

  async function startOnlinePayment(cartId: string, shippingAddress: CheckoutSchemaType) {
    "use server";
    if (!accessToken) throw new Error("Please login first");
    const returnUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
    const res = await createOnlineOrder(accessToken, cartId, shippingAddress, returnUrl);
    return res.session.url;
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
    <CheckoutClient
      cart={cart}
      isLoggedIn={!!accessToken}
      onCashOrder={placeCashOrder}
      onOnlinePayment={startOnlinePayment}
    />
  );
}
