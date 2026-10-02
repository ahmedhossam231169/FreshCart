
import Image from "next/image";
import Link from "next/link";
import AuthLayout from "@/src/components/auth/AuthLayout";
import ProductCard from "@/src/components/home/ProductCard";
import HeroSlider from "@/src/components/home/HeroSlider";
import {
  IconArrowPath,
  IconArrowRight,
  IconApple,
  IconCheckCircle,
  IconChevronDown,
  IconHeadset,
  IconMail,
  IconPlay,
  IconShieldCheck,
  IconStar,
  IconTruck,
} from "@/src/components/auth/icons";
import { getCategories } from "@/src/services/getcategories.service";
import { getProducts } from "@/src/services/getProuducts.service";





export default async function Home() {
  const categoriseData = await getCategories();
  const categories = categoriseData.data
  const productsData = await getProducts();
  const products = productsData.data
  
  return (
    <AuthLayout>
      <HeroSlider />

      {/* Quick info strip: shipping, payment, returns, support */}
      <div className="bg-[#f9fafb] px-[120px] py-8">
        <div className="flex items-stretch justify-center gap-4">
          <div className="flex flex-1 items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#fef2f2]">
              <IconTruck className="h-5 w-5 text-[#fb2c36]" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[#1e2939]">Free Shipping</h3>
              <p className="text-xs text-[#6a7282]">On orders over 500 EGP</p>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ecfdf5]">
              <IconShieldCheck className="h-5 w-5 text-[#00bc7d]" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[#1e2939]">Secure Payment</h3>
              <p className="text-xs text-[#6a7282]">100% secure transactions</p>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6]">
              <IconArrowPath className="h-5 w-5 text-[#ff6900]" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[#1e2939]">Easy Returns</h3>
              <p className="text-xs text-[#6a7282]">14-day return policy</p>
            </div>
          </div>
          <div className="flex flex-1 items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f9fafb]">
              <IconHeadset className="h-5 w-5 text-[#ad46ff]" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-[#1e2939]">24/7 Support</h3>
              <p className="text-xs text-[#6a7282]">Dedicated support team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Shop By Category */}
      <div className="flex flex-col gap-8 px-[120px] py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-[#00bc7d] to-[#007a55]" />
            <h2 className="text-3xl font-bold text-[#1e2939]">
              Shop By <span className="text-[#009966]">Category</span>
            </h2>
          </div>
          {/* TODO: link to the full categories page */}
          <a href="#" className="flex items-center gap-2 text-base font-medium text-[#16a34a]">
            View All Categories
            <IconChevronDown className="h-4 w-4 -rotate-90" />
          </a>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {categories.map((category: { name: string; image: string }) => (
            // TODO: link to the actual category page
            <a
              key={category.name}
              href="#"
              className="flex flex-col items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
            >
              <div className="h-25 w-25 overflow-hidden rounded-full">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-base font-medium text-[#364153]">{category.name}</h3>
            </a>
          ))}
        </div>
      </div>

      {/* Two promo banners side by side */}
      <div className="flex gap-6 px-[120px] py-8">
        <div className="relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-[#00bc7d] to-[#007a55] p-8">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-white/10" />
          <div className="relative flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm text-white">
              🔥 Deal of the Day
            </span>
            <h3 className="text-3xl font-bold text-white">Fresh Organic Fruits</h3>
            <p className="text-base text-white/80">Get up to 40% off on selected organic fruits</p>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-white">40% OFF</span>
              <span className="text-sm text-white/70">
                Use code: <span className="font-bold text-white">ORGANIC40</span>
              </span>
            </div>
            {/* TODO: link to the products page filtered by this deal */}
            <Link
              href="/products"
              className="flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-[#009966]"
            >
              Shop Now
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-[#ff8904] to-[#ff2056] p-8">
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-white/10" />
          <div className="relative flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm text-white">
              ✨ New Arrivals
            </span>
            <h3 className="text-3xl font-bold text-white">Exotic Vegetables</h3>
            <p className="text-base text-white/80">Discover our latest collection of premium vegetables</p>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-white">25% OFF</span>
              <span className="text-sm text-white/70">
                Use code: <span className="font-bold text-white">FRESH25</span>
              </span>
            </div>
            {/* TODO: link to the products page filtered by this deal */}
            <Link
              href="/products"
              className="flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-[#ff6900]"
            >
              Explore Now
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="flex flex-col gap-8 px-[120px] py-8">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-[#00bc7d] to-[#007a55]" />
          <h2 className="text-3xl font-bold text-[#1e2939]">Featured Products</h2>
        </div>

        <div className="grid grid-cols-5 gap-6">
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
      </div>

      {/* Newsletter signup + mobile app promo */}
      <div className="px-[120px] py-16">
        <div className="grid grid-cols-2 gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-[#f0fdf4] to-white p-14 shadow-sm">
          {/* Left side: newsletter form */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#dcfce7]">
                <IconMail className="h-6 w-6 text-[#16a34a]" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-[#1e2939]">Newsletter</h3>
                <p className="text-xs text-[#6a7282]">50,000+ subscribers</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1e2939]">Get the Freshest Updates Delivered Free</h2>
              <p className="mt-2 text-base text-[#6a7282]">
                Weekly recipes, seasonal offers &amp; exclusive member perks.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 text-sm text-[#364153]">
                <IconCheckCircle className="h-5 w-5 text-[#16a34a]" />
                Fresh Picks Weekly
              </span>
              <span className="flex items-center gap-2 text-sm text-[#364153]">
                <IconCheckCircle className="h-5 w-5 text-[#16a34a]" />
                Free Delivery Codes
              </span>
              <span className="flex items-center gap-2 text-sm text-[#364153]">
                <IconCheckCircle className="h-5 w-5 text-[#16a34a]" />
                Members-Only Deals
              </span>
            </div>

            {/* TODO: handle newsletter signup */}
            <form className="flex flex-col gap-2">
              <div className="flex gap-3">
                <input suppressHydrationWarning
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 rounded-xl border border-[#e5e7eb] bg-white px-5 py-4 text-base text-[#364153] placeholder:text-[#364153]/50"
                />
                <button suppressHydrationWarning
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-[#16a34a] px-8 py-4 text-base font-semibold text-white"
                >
                  Subscribe
                  <IconArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-[#6a7282]">✨ Unsubscribe anytime. No spam, ever.</p>
            </form>
          </div>

          {/* Right side: mobile app promo card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#101828] to-[#1e2939] p-8">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/5" />

            <div className="relative flex flex-col gap-4">
              <span className="w-fit rounded-full bg-white/10 px-3 py-1.5 text-xs text-white">📱 MOBILE APP</span>
              <h3 className="text-2xl font-bold text-white">Shop Faster on Our App</h3>
              <p className="text-base text-[#99a1af]">Get app-exclusive deals &amp; 15% off your first order.</p>

              <div className="flex flex-col gap-3">
                {/* TODO: link to the App Store */}
                <a href="#" className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-3">
                  <IconApple className="h-6 w-6 text-white" />
                  <span className="text-left">
                    <span className="block text-xs text-[#99a1af]">Download on</span>
                    <span className="block text-sm font-semibold text-white">App Store</span>
                  </span>
                </a>
                {/* TODO: link to Google Play */}
                <a href="#" className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-3">
                  <IconPlay className="h-6 w-6 text-white" />
                  <span className="text-left">
                    <span className="block text-xs text-[#99a1af]">Get it on</span>
                    <span className="block text-sm font-semibold text-white">Google Play</span>
                  </span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center text-[#facc15]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <IconStar key={index} className="h-4 w-4" />
                  ))}
                </span>
                <span className="text-sm text-[#99a1af]">4.9 • 100K+ downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
