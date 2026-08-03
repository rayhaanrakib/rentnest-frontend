const PropertiesPageSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="h-7 w-40 rounded-full bg-slate-200" />
          <div className="mt-4 h-10 w-56 rounded-xl bg-slate-200" />
          <div className="mt-2 h-5 w-80 rounded-lg bg-slate-100" />
        </div>
        <div className="h-11 w-36 rounded-full bg-slate-200" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-[1.5rem] border border-slate-200/80 bg-white p-4">
            <div className="mb-3 h-10 w-10 rounded-xl bg-slate-100" />
            <div className="h-8 w-12 rounded-lg bg-slate-200" />
            <div className="mt-1 h-4 w-20 rounded bg-slate-100" />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-24 rounded-lg bg-slate-200" />
        <div className="h-7 w-28 rounded-full bg-slate-100" />
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-[2rem] border border-slate-200/80 bg-white overflow-hidden">
            {/* Image */}
            <div className="aspect-[16/10] bg-slate-100" />

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="h-5 w-3/4 rounded-lg bg-slate-200" />
              <div className="h-4 w-1/2 rounded bg-slate-100" />

              {/* Stats */}
              <div className="flex gap-2 pt-1">
                <div className="h-7 w-14 rounded-lg bg-slate-100" />
                <div className="h-7 w-14 rounded-lg bg-slate-100" />
                <div className="h-7 w-20 rounded-lg bg-slate-100" />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="h-4 w-24 rounded bg-slate-100" />
                <div className="flex gap-1.5">
                  <div className="h-9 w-9 rounded-xl bg-slate-100" />
                  <div className="h-9 w-9 rounded-xl bg-slate-100" />
                  <div className="h-9 w-9 rounded-xl bg-slate-100" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiesPageSkeleton;