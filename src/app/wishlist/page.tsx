import { getToWishList, removeToWishList } from "@/src/services/wishList.service";
import { getServerToken } from "@/lib/Token";
import WishlistClient from "./WishlistClient";

export default async function Wishlist() {
  const decodedToken = await getServerToken();
  const accessToken = decodedToken?.accessToken;
  
  async function removeitemformWishlist(productId: string) {
    "use server";
    if (!accessToken) return;
    await removeToWishList(accessToken, productId);
  }

  let finalData: ProductI[] = [];
  if (accessToken) {
    try {
      const data = await getToWishList(accessToken);
      finalData = data.data;
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  }

  return (
    <WishlistClient
      data={finalData}
      token={accessToken}
      onRemove={removeitemformWishlist}
    />
  );
}
