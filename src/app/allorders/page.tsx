import { getServerToken } from "@/lib/Token";
import { getUserOrdersService } from "@/src/services/orders.service";
import type { OrderI } from "@/src/types/orderType";
import OrdersClient from "./OrdersClient";

// The Route access token is a JWT whose payload holds the user's id: { id, name, role }
function getUserIdFromToken(accessToken: string): string | null {
  try {
    const payload = accessToken.split(".")[1];
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return decoded?.id ?? null;
  } catch {
    return null;
  }
}

export default async function AllOrders() {
  const decodedToken = await getServerToken();
  const accessToken = decodedToken?.accessToken as string | undefined;
  const userId = accessToken ? getUserIdFromToken(accessToken) : null;

  let orders: OrderI[] = [];
  let loadFailed = false;
  if (userId) {
    try {
      orders = await getUserOrdersService(userId);
      // Newest orders first
      orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      loadFailed = true;
    }
  }

  return <OrdersClient orders={orders} isLoggedIn={!!accessToken} loadFailed={loadFailed} />;
}
