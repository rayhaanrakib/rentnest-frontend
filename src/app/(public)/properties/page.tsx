import { Suspense } from "react";
import PropertyFilters from "@public/_components/_properties/PropertyFilters";
import PropertySkeleton from "@public/_components/_properties/PropertySkeleton";
import PropertyList from "@public/_components/_properties/PropertyList";
import { getCategories } from "@public/_actions/getData";
import { ICategory } from "@/types";

function PropertySkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <PropertySkeleton key={i} />
      ))}
    </div>
  );
}

const PropertyPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const query = await searchParams;
  const categories: ICategory[] = await getCategories();

  if (!categories) {
    return null;
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div className="mb-12 max-w-3xl">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-brand-700 bg-brand-50 rounded-full mb-4 border border-brand-100">
            Available Listings
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.1]">
            Find your next <br className="hidden sm:block" />
            <span className="gradient-text">perfect space</span>
          </h1>

          <p className="mt-4 text-slate-500 text-lg">
            Browse through our extensive collection of verified properties
            available for rent.
          </p>
        </div>

        {/* Filters */}
        <PropertyFilters categories={categories} />

        {/* Property List */}
        <Suspense
          key={JSON.stringify(query)}
          fallback={<PropertySkeletonGrid />}
        >
          <PropertyList query={query} />
        </Suspense>
      </div>
    </div>
  );
};

export default PropertyPage;