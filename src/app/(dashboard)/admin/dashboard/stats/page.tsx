import { Suspense } from "react";
import { LayoutDashboard } from "lucide-react";
import { getAdminDashboardStats } from "@dashboard/admin/_actions/adminActions";
import {
  Users,
  Home,
  Building2,
  FileText,
  DollarSign,
  Clock,
  UserCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";


const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 animate-pulse">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="rounded-[1.5rem] border border-slate-200/80 bg-white p-4"
        >
          <div className="mb-3 h-10 w-10 rounded-xl bg-slate-100" />
          <div className="h-8 w-16 rounded-lg bg-slate-200" />
          <div className="mt-1 h-4 w-24 rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
};


const StatsContent = async () => {
  const data = await getAdminDashboardStats();

  if (!data) return null;

  const stats = [
    {
      label: "Total Users",
      value: data.totalUsers,
      icon: Users,
      accent: "from-slate-100 to-slate-50",
      iconColor: "text-slate-700",
    },
    {
      label: "Tenants",
      value: data.totalTenants,
      icon: UserCheck,
      accent: "from-blue-50 to-white",
      iconColor: "text-blue-600",
    },
    {
      label: "Landlords",
      value: data.totalLandlords,
      icon: Building2,
      accent: "from-brand-50 to-white",
      iconColor: "text-brand-600",
    },
    {
      label: "Properties",
      value: data.totalProperties,
      icon: Home,
      accent: "from-emerald-50 to-white",
      iconColor: "text-emerald-600",
    },
    {
      label: "Total Rentals",
      value: data.totalRentals,
      icon: FileText,
      accent: "from-violet-50 to-white",
      iconColor: "text-violet-600",
    },
    {
      label: "Revenue",
      value: `৳${data.totalRevenue?.toLocaleString()}`,
      icon: DollarSign,
      accent: "from-amber-50 to-white",
      iconColor: "text-amber-600",
    },
    {
      label: "Pending Requests",
      value: data.pendingRequests,
      icon: Clock,
      accent: "from-red-50 to-white",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-b p-4 shadow-sm",
            stat.accent
          )}
        >
          <div
            className={cn(
              "mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm",
              stat.iconColor
            )}
          >
            <stat.icon className="h-4 w-4" />
          </div>
          <p className="text-2xl font-bold tracking-tight text-slate-900">
            {stat.value}
          </p>
          <p className="mt-0.5 text-xs font-medium text-slate-500">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};


const AdminDashboardStatsPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
          <LayoutDashboard className="h-3.5 w-3.5" />
          Overview
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
         Statistics
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          A quick overview of your platform&apos;s key metrics.
        </p>
      </div>

      {/* Stats */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsContent />
      </Suspense>
    </div>
  );
};

export default AdminDashboardStatsPage;