import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-white p-4 overflow-hidden">
      {/* Main Content Skeleton */}
      <div className="relative z-10 w-full max-w-3xl text-center space-y-8">
        <Skeleton className="h-10 w-56 rounded-full mx-auto bg-slate-100" />

        <div className="space-y-4">
          <Skeleton className="h-16 md:h-20 w-full md:w-4/5 mx-auto bg-slate-100" />
          <Skeleton className="h-16 md:h-20 w-2/3 mx-auto bg-slate-100" />
        </div>

        <Skeleton className="h-6 w-full md:w-1/2 mx-auto bg-slate-100" />

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-8">
          <Skeleton className="h-14 w-52 rounded-full mx-auto bg-slate-100" />
          <Skeleton className="h-14 w-52 rounded-full mx-auto bg-slate-100" />
        </div>
      </div>
    </main>
  );
}
export default Loading;
