const UsersPageSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
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

      {/* Filters */}
      <div className="flex gap-3">
        <div className="h-10 w-32 rounded-xl bg-slate-100" />
        <div className="h-10 w-32 rounded-xl bg-slate-100" />
      </div>

      {/* Table */}
      <div className="rounded-[1.5rem] border border-slate-200/80 bg-white overflow-hidden">
        <div className="flex items-center border-b border-slate-100 px-6 py-4 gap-6">
          <div className="h-4 w-20 rounded bg-slate-100 flex-1" />
          <div className="h-4 w-20 rounded bg-slate-100 flex-1" />
          <div className="h-4 w-16 rounded bg-slate-100 flex-1" />
          <div className="h-4 w-16 rounded bg-slate-100 flex-none" />
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center border-b border-slate-50 px-6 py-4 gap-6">
            <div className="flex-1 flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-slate-200" />
              <div className="space-y-1">
                <div className="h-4 w-28 rounded bg-slate-200" />
                <div className="h-3 w-36 rounded bg-slate-100" />
              </div>
            </div>
            <div className="flex-1">
              <div className="h-6 w-20 rounded-full bg-slate-100" />
            </div>
            <div className="flex-1">
              <div className="h-6 w-16 rounded-full bg-slate-100" />
            </div>
            <div className="flex-none">
              <div className="h-9 w-9 rounded-xl bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPageSkeleton;