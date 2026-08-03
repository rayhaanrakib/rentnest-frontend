import { Suspense } from "react";
import { Folder } from "lucide-react";
import CategoriesList from "@dashboard/admin/_components/categories/CategoriesList";
import CategoriesPageSkeleton from "@dashboard/admin/_components/categories/CategoriesPageSkeleton";
import CreateCategoryButton from "@dashboard/admin/_components/categories/CreateCategoryButton";

const AdminCategoriesPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            <Folder className="h-3.5 w-3.5" />
            Categories
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Categories
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Organize your properties into categories for better discoverability.
          </p>
        </div>

        <CreateCategoryButton />
      </div>

      {/* Categories */}
      <Suspense fallback={<CategoriesPageSkeleton />}>
        <CategoriesList />
      </Suspense>
    </div>
  );
};

export default AdminCategoriesPage;