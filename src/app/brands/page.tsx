import Link from "next/link";
import Image from "next/image";
import AuthLayout from "@/src/components/auth/AuthLayout";
import { IconTag, IconArrowRight } from "@/src/components/auth/icons";
import { getTopBrands } from "@/src/services/getTopBrands.service";

export default async function TopBrands() {
  const topBrandsData = await getTopBrands();
  const topBrands = topBrandsData.data;
  

  return (
    <AuthLayout>
    
      <div className="bg-gradient-to-br from-[#9810fa] to-[#c27aff] px-[120px] py-10">
        <div className="pb-4 text-sm text-white/90">
          <Link href="/" className="hover:text-white">
            Home
          </Link>{" "}
          / <span className="text-white">Brands</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <IconTag className="h-7 w-7 text-white" />
          </span>
          <div>
            <h1 className="text-3xl font-bold text-white">Top Brands</h1>
            <p className="text-sm text-white/90">Shop from your favorite brands</p>
          </div>
        </div>
      </div>

      {/* Brand grid */}
      <div className="grid grid-cols-6 gap-6 px-[120px] py-10">
        {topBrands.map((brand: BrandI) => (
          
          <Link
            key={brand._id}
            href={`/brands/${brand._id}`}
            className="brandCard group flex flex-col h-[280px] items-center gap-3 rounded-xl border border-[#f3f4f6] bg-white p-4 shadow-sm transition hover:border-[#e9d4ff] hover:shadow-md"
          >
            <div className="  flex h-130 w-full items-center justify-center rounded-lg bg-[#f9fafb] p-3">
              <Image
                src={brand.image}
                alt={brand.name}
                width={150}
                height={150}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-sm font-medium text-[#364153] group-hover:text-[#9810fa]">
                {brand.name}
              </h3>
              <span className="hidden items-center gap-1 text-xs font-medium text-[#9810fa] group-hover:flex">
                View Products
                <IconArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </AuthLayout>
  );
}
