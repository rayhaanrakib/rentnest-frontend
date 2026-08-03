import { Suspense } from "react";
import { Users } from "lucide-react";
import RentalsPageSkeleton from "@dashboard/landlord/_components/rentals/RentalsPageSkeleton";
import RentalsList from "@dashboard/landlord/_components/rentals/RentalsList";

const LandlordRentalsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
          <Users className="h-3.5 w-3.5" />
          Rental Requests
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Rental Requests
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          Review and manage rental requests from tenants.
        </p>
      </div>

      <Suspense fallback={<RentalsPageSkeleton />}>
        <RentalsList />
      </Suspense>
    </div>
  );
};

export default LandlordRentalsPage;