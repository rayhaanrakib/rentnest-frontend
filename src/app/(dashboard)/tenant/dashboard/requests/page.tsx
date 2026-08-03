import { getTenantRentals } from "@dashboard/tenant/_actions/tenantActions";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  ArrowUpRight,
  CalendarDays,
} from "lucide-react";
import RentalDetailModal from "@dashboard/tenant/_components/RentalDetailModal";

const TenantDashboardRequestsPage = async () => {
  const data = await getTenantRentals();

  if (!data || !data.requests || data.requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <Clock className="h-8 w-8 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
          No requests yet
        </h2>
        <p className="text-slate-500 mb-8 max-w-sm">
          When you request to rent a property, it will appear here for you to track its status.
        </p>
        <Link
          href="/properties"
          className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all shadow-sm"
        >
          Browse Properties
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const {
    total_requests,
    total_pending_requests,
    total_active_requests,
    total_rejected_requests,
    requests,
  } = data;

  const stats = [
    { label: "Total Requests", value: total_requests, icon: Clock, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Pending", value: total_pending_requests, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Active", value: total_active_requests, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Rejected", value: total_rejected_requests, icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  ];

  const renderStatusBadge = (status: string) => {
    const config: Record<string, { color: string; label: string }> = {
      PENDING: { color: "bg-amber-50 text-amber-700 border-amber-200", label: "Pending" },
      APPROVED: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Approved" },
      ACTIVE: { color: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Active" },
      REJECTED: { color: "bg-red-50 text-red-700 border-red-200", label: "Rejected" },
      COMPLETED: { color: "bg-blue-50 text-blue-700 border-blue-200", label: "Completed" },
    };

    const { color, label } = config[status] || { color: "bg-slate-50 text-slate-700 border-slate-200", label: status };
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {label}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-brand-700 bg-brand-50 rounded-full mb-3 border border-brand-100">
          Dashboard
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900">
          My Requests
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Track the status of your rental applications and active leases.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold text-slate-900 tracking-tighter">{stat.value}</p>
              <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Requests */}
      <div className="space-y-6">
        {requests.map((req: any, index: number) => (
          <div
            key={index}
            className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0">
              {req.property?.images?.[0] ? (
                <Image
                  src={req.property.images[0]}
                  alt={req.property.title}
                  fill
                  className="object-cover content-center"
                  sizes="(max-width: 768px) 100vw, 256px"
                />
              ) : (
                <div className="w-full h-full bg-slate-100" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:bg-gradient-to-r" />
            </div>

            {/* Content */}
            <div className="flex-grow p-6 md:p-8 flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    {renderStatusBadge(req.status)}
                    {req.payment?.status === "COMPLETED" && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border bg-blue-50 text-blue-700 border-blue-200">
                        <CreditCard className="h-3 w-3" /> Paid
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {req.property?.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-slate-500">
                    <MapPin className="h-4 w-4" />
                    <p className="text-sm">
                      {req.property?.address}, {req.property?.city}
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <p className="text-2xl font-bold text-slate-900">
                    ৳{req.property?.rentAmount?.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-400">per month</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-4 items-center">
                {/* Landlord */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {req.property?.landlord?.name?.charAt(0) || "L"}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Landlord</p>
                    <p className="text-sm font-medium text-slate-800">{req.property?.landlord?.name}</p>
                  </div>
                </div>

                {/* Payment */}
                <div className="sm:text-right flex sm:justify-end gap-2 items-center">
                  {req.payment ? (
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                      <span>Paid on {new Date(req.payment.paidAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  ) : req.status === "APPROVED" ? (
                    <Link
                      href={`/payment?rentalRequestId=${req.id}`}
                      className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-all"
                    >
                      <CreditCard className="h-3.5 w-3.5" /> Make Payment
                    </Link>
                  ) : (
                    <RentalDetailModal rental={req} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TenantDashboardRequestsPage;