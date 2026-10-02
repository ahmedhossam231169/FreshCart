const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function addToWishList(userToken: string, productId: string) {
  const response = await fetch(`${BASE_URL}/api/v1/wishlist`, {
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
export async function removeToWishList(userToken: string, productId: string) {
  const response = await fetch(`${BASE_URL}/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "token": userToken
    },
  
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to add product to cart");
  }
  return data;
}
export async function getToWishList(userToken: string) {
  const response = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "token": userToken
    },
    
  });
  const data = await response.json();
  if (!response.ok) {
  console.log("errorrrrrr")
  }
  return data;
}