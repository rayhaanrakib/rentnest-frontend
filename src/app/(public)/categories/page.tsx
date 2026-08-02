import { Suspense } from "react";
import CategorySkeleton from "@public/_components/_categories/CategorySkeleton";
import CategoriesContent from "@public/_components/_categories/CategoriesContent";

const CategoriesPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-32">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-brand-700 bg-brand-50 rounded-full mb-4 border border-brand-100">
            Explore Categories
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.1]">
            Browse by <span className="gradient-text">Property Type</span>
          </h1>
          <p className="mt-4 text-slate-500 text-lg">
            Discover spaces tailored to your specific needs, from residential
            homes to commercial hubs.
          </p>
        </div>

        <Suspense fallback={<CategorySkeleton />}>
          <CategoriesContent />
        </Suspense>
      </div>
    </div>
  );
};

export default CategoriesPage;