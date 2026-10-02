import type { CheckoutSchemaType } from "@/lib/schema/checkoutSchema";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Body the API expects:
// { "shippingAddress": { "details": "...", "phone": "01...", "city": "..." } }
export async function createCashOrder(userToken: string, cartId: string, shippingAddress: CheckoutSchemaType) {
  const response = await fetch(`${BASE_URL}/api/v2/orders/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token": userToken
    },
    body: JSON.stringify({ shippingAddress })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to create order");
  }
  return data;
}

// Returns a Stripe checkout session; the user is sent to data.session.url to pay
export async function createOnlineOrder(userToken: string, cartId: string, shippingAddress: CheckoutSchemaType, returnUrl: string) {
  const response = await fetch(`${BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token": userToken
    },
    body: JSON.stringify({ shippingAddress })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to start online payment");
  }
  return data as { status: string; session: { url: string } };
}
