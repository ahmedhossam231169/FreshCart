
import Image from "next/image";
import Link from "next/link";
import { IconArrowPath, IconEye, IconHeart, IconStar } from "@/src/components/auth/icons";
import { getServerToken } from "@/lib/Token";
import AddToCartBtn from "@/components/ui/addToCartBtn";
import AddToWishtBtn from "@/components/ui/addToWhishList";
import { cache } from "react";
import { getToWishList } from "@/src/services/wishList.service";

// Fetch the wishlist once per request, shared by every ProductCard on the page
const getWishlistIds = cache(async (token: string): Promise<string[]> => {
  if (!token) return [];
  try {
    const data = await getToWishList(token);
    return (data?.data ?? []).map((item: { _id?: string; id?: string }) => item._id ?? item.id);
  } catch {
    return [];
  }
});

type ProductCardProps = {
  id: string;
  image: string;
  category: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  ratingCount: number;
};

export default async function ProductCard({
  id,
  image,
  category,
  name,
  price,
  oldPrice,
  rating,
  ratingCount,

}: ProductCardProps) {
  const decodedToken = await getServerToken();
  const accessToken = decodedToken?.accessToken;
  const wishlistIds = await getWishlistIds(accessToken || "");

  return (
    <div
       className="ProductCard  flex h-full flex-col justify-between  border border-[#e5e7eb] bg-white p-4 shadow-sm">
      <div>
        <div className="relative h-44 overflow-hidden rounded-xl">
          <Image src={image} alt={name} fill className="object-contain p-2" />

          {/* Discount badge - only shows up when there is an old price to compare against */}
          {oldPrice && (
            <span className="absolute left-2 top-2 rounded-md bg-[#fb2c36] px-1.5 py-0.5 text-xs font-semibold text-white">
              -{Math.round(((oldPrice - price) / oldPrice) * 100)}%
            </span>
          )}

          {/* TODO: wire these up to wishlist / compare / quick-view */}
          <div className="absolute right-2 top-2 flex flex-col gap-2">
            <AddToWishtBtn id={id} token={accessToken || ""} initialInWishlist={wishlistIds.includes(id)} />
            <button suppressHydrationWarning
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-[#4a5565] shadow-sm hover:text-green-500"
            >
              <IconArrowPath className="h-4 w-4" />
            </button>

            <Link href={`/products/${id}`}>
              <button suppressHydrationWarning
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-[#4a5565] shadow-sm  hover:text-green-500"
              >
                <IconEye className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>

        <span className="mt-4 block text-xs font-medium text-[#a16207]">{category}</span>
        <Link href={`/products/${id}`}>
          <h3 className="text-base font-semibold text-[#1e2939]">{name}</h3>
        </Link>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="flex items-center gap-0.5 text-[#facc15]">
            {Array.from({ length: 5 }).map((_, index) => (
              <IconStar
                key={index}
                className={`h-3.5 w-3.5 ${index < rating ? "" : "text-[#e5e7eb]"}`}
              />
            ))}
          </span>
          <span className="text-xs text-[#6a7282]">
            {rating} ({ratingCount})
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#1e2939]">{price} EGP</span>
          {oldPrice && (
            <span className="text-sm text-[#99a1af] line-through">{oldPrice} EGP</span>
          )}
        </div>

        <AddToCartBtn id={id} token={accessToken || ""} />
      </div>
    </div>
  );
}
