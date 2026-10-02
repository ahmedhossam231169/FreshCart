import Link from "next/link";
import Image from "next/image";
import AuthLayout from "@/src/components/auth/AuthLayout";
import { IconBox } from "@/src/components/auth/icons";
import { getCategories } from "@/src/services/getcategories.service";

type CategoryI = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export default async function CategoriesPage() {
  const categoriesData = await getCategories();
  const categories: CategoryI[] = categoriesData?.data ?? [];

  return (
    <AuthLayout>
      <div className="bg-gradient-to-r from-[#00c950] to-[#05df72] px-4 sm:px-6 lg:px-10 xl:px-[120px] py-10">
        <div className="pb-4 text-sm text-white/90">
          <Link href="/" className="hover:text-white">
            Home
          </Link>{" "}
          / <span className="text-white">Categories</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <IconBox className="h-7 w-7 text-white" />
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">All Categories</h1>
            <p className="text-sm text-white/90">Browse products by category</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 px-4 sm:px-6 lg:px-10 xl:px-[120px] py-10 md:grid-cols-4 lg:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category._id}
            href="/products"
            className="group flex flex-col items-center gap-3 rounded-xl border border-[#f3f4f6] bg-white p-4 shadow-sm transition hover:border-[#bbf7d0] hover:shadow-md"
          >
            <div className="flex h-[140px] sm:h-[200px] w-full items-center justify-center overflow-hidden rounded-lg bg-[#f9fafb]">
              <Image
                src={category.image}
                alt={category.name}
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-sm font-medium text-[#364153] group-hover:text-[#16a34a]">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </AuthLayout>
  );
}
