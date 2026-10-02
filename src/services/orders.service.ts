import type { OrderI } from "@/src/types/orderType";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// This endpoint needs the user's id (not the token) in the URL
export async function getUserOrdersService(userId: string): Promise<OrderI[]> {
  const response = await fetch(`${BASE_URL}/api/v1/orders/user/${userId}`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to load orders");
  }
  return data;
}
