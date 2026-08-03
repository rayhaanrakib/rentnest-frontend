import { Suspense } from "react";
import { Building2 } from "lucide-react";
import PropertiesList from "@dashboard/landlord/_components/properties/PropertiesList";
import PropertiesPageSkeleton from "@dashboard/landlord/_components/properties/PropertiesPageSkeleton";

const LandlordPropertiesPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
          <Building2 className="h-3.5 w-3.5" />
          Property Management
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Your Properties
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          Manage your rental portfolio. Track availability, occupancy, and performance across all your listings.
        </p>
      </div>

      <Suspense fallback={<PropertiesPageSkeleton />}>
        <PropertiesList />
      </Suspense>
    </div>
  );
};

export default LandlordPropertiesPage;