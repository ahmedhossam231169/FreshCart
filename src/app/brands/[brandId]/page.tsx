import Image from "next/image";
import Link from "next/link";
import AuthLayout from "@/src/components/auth/AuthLayout";

import { IconBox, IconTag, IconX } from "@/src/components/auth/icons";
import ProductCard from "@/src/components/home/ProductCard";
import { getBrandProducts } from "@/src/services/getProuducts.service";
import { getBrand } from "@/src/services/getTopBrands.service";

export default async function BrandDetailsPage(props: PageProps<"/brands/[brandId]">) {
  const { brandId } = await props.params;

  const [productsResponse, brandResponse] = await Promise.all([
    getBrandProducts(brandId),
    getBrand(brandId),
  ]);
  const products: ProductI[] = productsResponse.data;
  const brand: BrandI = brandResponse.data;

  return (
    <AuthLayout>
      {/* Green banner with breadcrumb and brand title */}
      <div className="bg-gradient-to-r from-[#00c950] to-[#05df72] px-4 sm:px-6 lg:px-[60px] py-8 lg:py-[60px]">
        <div className="pb-4 text-sm text-white/90">
          <Link href="/" className="hover:text-white">
            Home
          </Link>{" "}
          / <Link href="/brands" className="hover:text-white">Brands</Link>{" "}
          / <span className="text-white">{brand.name}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 p-2.5">
            <Image src={brand.image} alt={brand.name} fill className="object-contain p-2.5" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{brand.name}</h1>
            <p className="text-sm text-white/90">Shop {brand.name} products</p>
          </div>
        </div>
      </div>

      {/* Active filters row */}
      <div className="flex flex-wrap items-center gap-3 px-4 sm:px-6 lg:px-[60px] pt-6 text-sm">
        <span className="flex items-center gap-1.5 text-[#4a5565]">
          <IconTag className="h-4 w-4" />
          Active Filters:
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-[#f3e8ff] px-3 py-1 text-[#9810fa]">
          {brand.name}
          <button suppressHydrationWarning type="button">
            <IconX className="h-3 w-3" />
          </button>
        </span>
        <button suppressHydrationWarning type="button" className="text-[#4a5565] underline underline-offset-2">
          Clear all
        </button>
      </div>

      {/* Products count */}
      <div className="px-4 sm:px-6 lg:px-[60px] pt-4">
        <p className="text-sm text-[#6a7282]">Showing {products.length} products</p>
      </div>

      {products.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center gap-4 px-4 sm:px-6 lg:px-[60px] py-24 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f3f4f6]">
            <IconBox className="h-7 w-7 text-[#99a1af]" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-[#101828]">No Products Found</h2>
            <p className="mt-1 text-sm text-[#6a7282]">No products match your current filters.</p>
          </div>
          <Link
            href="/products"
            className="rounded-full bg-[#16a34a] px-6 py-2.5 text-sm font-semibold text-white"
          >
            View All Products
          </Link>
        </div>
      ) : (
        /* Product grid */
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5 px-4 sm:px-6 lg:px-10 xl:px-[120px] py-6">
          {products.map((product) => (
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
          ))}
        </div>
      )}
    </AuthLayout>
  );
}
