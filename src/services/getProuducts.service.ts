const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function getProducts() {
  const response = await fetch(`${BASE_URL}/api/v1/products`,)
  const data = await response.json() 
  return data;
}
export async function getSpecialProducts(productId: string) {
  const response = await fetch(`${BASE_URL}/api/v1/products/${productId}`)
  const data = await response.json() 
  return data;
}
export async function getRelatedProducts() {
  const response = await fetch(`${BASE_URL}/api/v1/products?limit=5`)
  const data = await response.json() 
  return data;
}
export async function getBrandProducts(brandId: string) {
  const response = await fetch(`${BASE_URL}/api/v1/products?brand=${brandId}`)
  const data = await response.json() 
  return data;
}