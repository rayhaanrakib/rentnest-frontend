const DashboardNavSkeleton = () => {
  return (
    <>
      <aside className="fixed left-4 top-4 bottom-4 z-40 hidden w-64 flex-col justify-between rounded-[2rem] border border-slate-200/60 bg-white/80 p-6 lg:flex animate-pulse">
        <div>
          {/* Logo */}
          <div className="mb-10">
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="mt-3 space-y-1">
              <div className="h-3 w-16 rounded bg-slate-100" />
              <div className="h-4 w-20 rounded bg-slate-200" />
            </div>
          </div>

          {/* Nav Items */}
          <div className="mt-6 space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl px-3 py-3">
                <div className="h-9 w-9 rounded-xl bg-slate-100" />
                <div className="h-4 w-24 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="space-y-4">
          {/* Back to Home */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded bg-slate-100" />
              <div className="h-4 w-24 rounded bg-slate-100" />
            </div>
            <div className="h-4 w-4 rounded bg-slate-100" />
          </div>

          {/* User Card */}
          <div className="rounded-[1.5rem] border border-slate-100 p-3">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-slate-200" />
              <div className="space-y-1">
                <div className="h-4 w-24 rounded bg-slate-200" />
                <div className="h-3 w-20 rounded bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar Skeleton */}
      <header className="fixed left-4 right-4 top-4 z-50 lg:hidden animate-pulse">
        <div className="flex items-center justify-between rounded-[1.5rem] border border-slate-200/60 bg-white/90 px-4 py-3.5">
          <div className="h-4 w-20 rounded bg-slate-200" />
          <div className="h-11 w-11 rounded-2xl bg-slate-100" />
        </div>
      </header>
    </>
  );
};

export default DashboardNavSkeleton;