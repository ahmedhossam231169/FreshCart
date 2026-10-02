import type { CartResponseI } from "@/src/types/cartType";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function addToCart(userToken: string, productId: string) {
  const response = await fetch(`${BASE_URL}/api/v2/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "token": userToken
    },
    body: JSON.stringify({ productId })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to add product to cart");
  }
  return data;
}
export async function displayCartService(userToken: string): Promise<CartResponseI> {
  const response = await fetch(`${BASE_URL}/api/v2/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "token": userToken
    },
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to load cart");
  }
  return data;
}
export async function updateCartItemService(userToken: string, productId: string, count: number): Promise<CartResponseI> {
  const response = await fetch(`${BASE_URL}/api/v2/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "token": userToken
    },
    body: JSON.stringify({ count: String(count) })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to update cart item");
  }
  return data;
}
export async function removeCartItemService(userToken: string, productId: string): Promise<CartResponseI> {
  const response = await fetch(`${BASE_URL}/api/v2/cart/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "token": userToken
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to remove cart item");
  }
  return data;
}
export async function clearCartService(userToken: string) {
  const response = await fetch(`${BASE_URL}/api/v2/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "token": userToken
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to clear cart");
  }
  return data;
}
