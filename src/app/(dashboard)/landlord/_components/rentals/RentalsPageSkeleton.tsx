const RentalsPageSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className="h-7 w-36 rounded-full bg-slate-200" />
        <div className="mt-4 h-10 w-64 rounded-xl bg-slate-200" />
        <div className="mt-2 h-5 w-80 rounded-lg bg-slate-100" />
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-[1.5rem] border border-slate-200/80 bg-white p-4"
          >
            <div className="mb-3 h-10 w-10 rounded-xl bg-slate-100" />
            <div className="h-8 w-12 rounded-lg bg-slate-200" />
            <div className="mt-1 h-4 w-20 rounded bg-slate-100" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="rounded-[1.5rem] border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="flex items-center border-b border-slate-100 px-6 py-4 gap-6">
          <div className="h-4 w-20 rounded bg-slate-100 flex-1" />
          <div className="h-4 w-20 rounded bg-slate-100 flex-1" />
          <div className="h-4 w-16 rounded bg-slate-100 flex-1" />
          <div className="h-4 w-16 rounded bg-slate-100 flex-none" />
        </div>

        {/* Table Rows */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center border-b border-slate-50 px-6 py-4 gap-6"
          >
            {/* Tenant */}
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="h-3 w-36 rounded bg-slate-100" />
            </div>

            {/* Property */}
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-40 rounded bg-slate-200" />
              <div className="h-3 w-28 rounded bg-slate-100" />
            </div>

            {/* Status */}
            <div className="flex-1">
              <div className="h-6 w-20 rounded-full bg-slate-100" />
            </div>

            {/* Actions */}
            <div className="flex-none">
              <div className="h-9 w-9 rounded-xl bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentalsPageSkeleton;