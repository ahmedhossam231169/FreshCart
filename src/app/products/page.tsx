import Link from "next/link";
import AuthLayout from "@/src/components/auth/AuthLayout";
import ProductCard from "@/src/components/home/ProductCard";
import { IconBox } from "@/src/components/auth/icons";
import { getProducts } from "@/src/services/getProuducts.service";


export default async function AllProductsPage() {
  const productsData = await getProducts();
  const products = productsData.data
  
  return (
    <AuthLayout>
    
      <div className="bg-gradient-to-r from-[#00c950] to-[#05df72] px-4 sm:px-6 lg:px-[60px] py-8 lg:py-[60px]">
      <div className="px-4 sm:px-6 lg:px-[60px] py-4 text-sm text-[#fff]">
        <Link href="/" className="hover:text-[#16a34a]">
          Home
        </Link>{" "}
        / <span className="text-[#fff]">All Products</span>
      </div>
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <IconBox className="h-7 w-7 text-white" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">All Products</h1>
            <p className="text-sm text-white/90">Explore our complete product collection</p>
          </div>
        </div>
      </div>

      {/* Products count */}
      <div className="px-4 sm:px-6 lg:px-[60px] pt-6">
        <p className="text-sm text-[#6a7282]">Showing {products.length} products</p>
      </div>

    
      {/* Product grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5 px-4 sm:px-6 lg:px-10 xl:px-[120px] py-6">
          {products
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

      {/* TODO: add pagination controls once the design needs it */}
    </AuthLayout>
  );
}
