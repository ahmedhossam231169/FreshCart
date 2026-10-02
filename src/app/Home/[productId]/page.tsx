import Link from "next/link";
import AuthLayout from "@/src/components/auth/AuthLayout";
import {
  IconHome,
  IconStar,
  IconHeart,
  IconShare,
  IconMinus,
  IconPlus,
  IconShoppingCart,
  IconBolt,
  IconTruck,
  IconArrowPath,
  IconShieldCheck,
  IconEye,
  IconArrowLeft,
  IconArrowRight,
} from "@/src/components/auth/icons";
import ProductTabs from "@/src/components/products/ProductTabs";
import ProductGallery from "@/src/components/products/ProductGallery";
import { getRelatedProducts, getSpecialProducts } from "@/src/services/getProuducts.service";
import ProductCard from "@/src/components/home/ProductCard";





export default async function ProductDetails(props: PageProps<"/products/[productId]">) {

  const { productId } = await props.params;
  const response = await getSpecialProducts(productId);
  const product = response.data;
  const relatedResponse = await getRelatedProducts();
  const relatedProducts: [ProductI] = relatedResponse.data;

  const images: string[] = product.images?.length
    ? product.images
    : product.imageCover
      ? [product.imageCover]
      : [];

  return (
    <AuthLayout>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 px-[120px] pt-6 text-sm text-[#6a7282]">
        <Link href="/" className="flex items-center gap-1.5 hover:text-[#16a34a]">
          <IconHome className="h-3.5 w-3.5" />
          Home
        </Link>
        <span>/</span>
        {/* TODO: link to the real category page */}
        <a href="#" className="hover:text-[#16a34a]">{product.category?.name}</a>
        <span>/</span>
        {/* TODO: link to the real subcategory page */}
        <a href="#" className="hover:text-[#16a34a]">{product.subcategory?.[0]?.name}</a>
        <span>/</span>
        <span className="text-[#1e2939]">{product.title}</span>
      </div>

      <div className="flex items-start gap-6 px-[120px] py-6">
        {/* Left side: image gallery */}
        <ProductGallery images={images} alt={product.title} />

        {/* Right side: product info */}
        <div className="flex-1 rounded-xl border border-[#e5e7eb] bg-white p-6">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-medium text-[#16a34a]">
              {product.category?.name}
            </span>
            <span className="rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-medium text-[#4a5565]">
              {product.brand?.name}
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold text-[#1e2939]">{product.title}</h1>

          <div className="mt-2 flex items-center gap-2">
            <span className="flex items-center gap-0.5 text-[#facc15]">
              {Array.from({ length: 5 }).map((_, index) => (
                <IconStar
                  key={index}
                  className={`h-4 w-4 ${index < product.ratingsAverage ? "" : "text-[#e5e7eb]"}`}
                />
              ))}
            </span>
            <span className="text-sm text-[#6a7282]">
              {Math.round(product.ratingsAverage ?? 0)} ({product.ratingsQuantity ?? 0} reviews)
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold text-[#1e2939]">{product.price} EGP</p>

          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#00a63e]">
            <span className="h-2 w-2 rounded-full bg-[#00a63e]" />
            In Stock
          </span>

          <div className="my-4 border-t border-[#e5e7eb]" />

          <p className="text-sm text-[#4a5565]">{product.description}</p>

          <div className="mt-4">
            <span className="text-sm font-medium text-[#1e2939]">Quantity</span>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-lg border border-[#e5e7eb] px-2 py-1">
                {/* TODO: hook up quantity decrease */}
                <button suppressHydrationWarning
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-[#4a5565]"
                >
                  <IconMinus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-semibold text-[#1e2939]">1</span>
                {/* TODO: hook up quantity increase */}
                <button suppressHydrationWarning
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-[#4a5565]"
                >
                  <IconPlus className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="text-sm text-[#6a7282]">{product.quantity ?? 0} available</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-[#f9fafb] px-4 py-3">
            <span className="text-sm text-[#4a5565]">Total Price:</span>
            <span className="text-lg font-bold text-[#16a34a]">{product.price.toFixed(2)} EGP</span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            {/* TODO: hook up add to cart */}
            <button suppressHydrationWarning
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#16a34a] py-3 text-sm font-semibold text-white"
            >
              <IconShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
            {/* TODO: hook up buy now / checkout */}
            <button suppressHydrationWarning
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#101828] py-3 text-sm font-semibold text-white"
            >
              <IconBolt className="h-4 w-4" />
              Buy Now
            </button>
          </div>

          <div className="mt-3 flex items-center gap-3">
            {/* TODO: hook up wishlist toggle */}
            <button suppressHydrationWarning
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#fef2f2] py-3 text-sm font-semibold text-[#fb2c36]"
            >
              <IconHeart className="h-4 w-4" />
              In Wishlist
            </button>
            {/* TODO: hook up share */}
            <button suppressHydrationWarning
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#4a5565]"
            >
              <IconShare className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-4 border-t border-[#e5e7eb] pt-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcfce7]">
                <IconTruck className="h-4.5 w-4.5 text-[#16a34a]" />
              </span>
              <div>
                <h4 className="text-sm font-medium text-[#1e2939]">Free Delivery</h4>
                <p className="text-xs text-[#6a7282]">Orders over 550</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcfce7]">
                <IconArrowPath className="h-4.5 w-4.5 text-[#16a34a]" />
              </span>
              <div>
                <h4 className="text-sm font-medium text-[#1e2939]">30 Days Return</h4>
                <p className="text-xs text-[#6a7282]">Money back</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcfce7]">
                <IconShieldCheck className="h-4.5 w-4.5 text-[#16a34a]" />
              </span>
              <div>
                <h4 className="text-sm font-medium text-[#1e2939]">Secure Payment</h4>
                <p className="text-xs text-[#6a7282]">100% Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-[120px]">
        <ProductTabs
          description={product.description}
          category={product.category?.name}
          subcategory={product.subcategory?.[0]?.name}
          brand={product.brand?.name}
          itemsSold={product.sold ? `${product.sold}+ sold` : ""}
          rating={Math.round(product.ratingsAverage ?? 0)}
          reviewCount={product.ratingsQuantity ?? 0}
        />
      </div>

      {/* You May Also Like */}
      <div className="flex flex-col gap-6 px-[120px] py-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-6 w-1.5 rounded-full bg-[#16a34a]" />
            <h2 className="text-xl font-bold text-[#1e2939]">
              You May Also <span className="text-[#16a34a]">Like</span>
            </h2>
          </div>

        </div>

        <div className="grid grid-cols-5 gap-6">
          {relatedProducts
            .map(
              (product: ProductI) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.imageCover}
                  category={product.category.name}
                  name={product.title}
                  price={product.priceAfterDiscount ?? product.price}
                  oldPrice={product.priceAfterDiscount ? product.price : undefined}
                  rating={Math.round(product.ratingsAverage)}
                  ratingCount={product.ratingsQuantity}
                />
              )
            )}
        </div>
      </div>
    </AuthLayout>
  );
}
