const CategoriesPageSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200/80 bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-5 w-28 rounded-lg bg-slate-200" />
                <div className="h-4 w-full max-w-[200px] rounded bg-slate-100" />
              </div>
              <div className="h-9 w-9 rounded-xl bg-slate-100" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="h-6 w-24 rounded-full bg-slate-100" />
              <div className="h-3 w-20 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPageSkeleton;