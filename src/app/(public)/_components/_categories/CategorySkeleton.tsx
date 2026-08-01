const CategorySkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col animate-pulse"
        >
          {/* Header Skeleton */}
          <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
            <div className="flex justify-between items-start mb-3">
              <div className="h-6 w-32 bg-slate-200 rounded-full"></div>
              <div className="h-6 w-20 bg-slate-100 rounded-full"></div>
            </div>
            <div className="h-4 w-full max-w-md bg-slate-100 rounded-full"></div>
            <div className="h-4 w-3/4 max-w-md bg-slate-100 rounded-full mt-2"></div>
          </div>

          {/* List Skeleton */}
          <div className="divide-y divide-slate-100 flex-grow">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="flex items-center justify-between p-5 md:p-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-200"></div>
                  <div className="h-4 w-40 md:w-56 bg-slate-200 rounded-full"></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;