const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export async function getTopBrands() {
  const response = await fetch(`${BASE_URL}/api/v1/brands`,)
  const topBrands = await response.json()
  return topBrands;
}
export async function getBrand(brandId: string) {
  const response = await fetch(`${BASE_URL}/api/v1/brands/${brandId}`)
  const brand = await response.json()
  return brand;
}