const DashboardHomeSkeleton = () => {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="h-7 w-24 rounded-full bg-slate-200" />
          <div className="mt-3 h-12 w-72 rounded-xl bg-slate-200" />
        </div>
        <div className="h-12 w-44 rounded-full bg-slate-200" />
      </div>

      {/* Account Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100">
          {/* Title */}
          <div className="h-6 w-36 rounded-lg bg-slate-200 mb-6" />

          {/* Avatar + Name */}
          <div className="flex flex-col sm:flex-row items-start gap-6 pb-6 border-b border-slate-100">
            <div className="h-20 w-20 rounded-full bg-slate-200 shrink-0" />
            <div className="space-y-2">
              <div className="h-7 w-40 rounded-lg bg-slate-200" />
              <div className="h-4 w-48 rounded bg-slate-100" />
              <div className="h-6 w-20 rounded-full bg-slate-100 mt-1" />
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div className="space-y-1">
                <div className="h-3 w-20 rounded bg-slate-100" />
                <div className="h-4 w-28 rounded bg-slate-200" />
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="h-10 w-10 rounded-full bg-slate-200" />
              <div className="space-y-1">
                <div className="h-3 w-20 rounded bg-slate-100" />
                <div className="h-4 w-28 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomeSkeleton;