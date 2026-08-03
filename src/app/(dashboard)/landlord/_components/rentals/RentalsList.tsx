import { getLandlordRentals } from "@dashboard/landlord/_actions/landlordActions";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import RentalRowActions from "@dashboard/landlord/_components/rentals/RentalRowActions";

const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  PENDING: { label: "Pending", color: "text-amber-700", bg: "bg-amber-50 border-amber-200", dot: "bg-amber-500" },
  APPROVED: { label: "Approved", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", dot: "bg-blue-500" },
  REJECTED: { label: "Rejected", color: "text-red-700", bg: "bg-red-50 border-red-200", dot: "bg-red-500" },
  ACTIVE: { label: "Active", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-500" },
  COMPLETED: { label: "Completed", color: "text-slate-700", bg: "bg-slate-100 border-slate-200", dot: "bg-slate-500" },
};

const RentalsList = async () => {
  const data = await getLandlordRentals();
  if (!data || !data.requests) return null;

  const { total_requests, total_pending_requests, total_approved_requests, total_rejected_requests, requests } = data;

  const stats = [
    { label: "Total Requests", value: total_requests, icon: FileText, accent: "from-slate-100 to-slate-50", iconColor: "text-slate-700" },
    { label: "Pending", value: total_pending_requests, icon: Clock, accent: "from-amber-50 to-white", iconColor: "text-amber-600" },
    { label: "Approved", value: total_approved_requests, icon: CheckCircle2, accent: "from-emerald-50 to-white", iconColor: "text-emerald-600" },
    { label: "Rejected", value: total_rejected_requests, icon: XCircle, accent: "from-red-50 to-white", iconColor: "text-red-600" },
  ];

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={cn("relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-b p-4 shadow-sm", stat.accent)}>
            <div className={cn("mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm", stat.iconColor)}>
              <stat.icon className="h-4 w-4" />
            </div>
            <p className="text-2xl font-bold tracking-tight text-slate-900">{stat.value}</p>
            <p className="mt-0.5 text-xs font-medium text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-[1.5rem] border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead className="text-xs font-semibold text-slate-500 px-6 py-4">Tenant</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 px-6 py-4">Property</TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 px-6 py-4">Status</TableHead>
              <TableHead className="text-right text-xs font-semibold text-slate-500 px-6 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((rental: any) => {
              const status = statusConfig[rental.status] ?? statusConfig.PENDING;

              return (
                <TableRow key={rental.id} className="border-slate-100 hover:bg-slate-50/50">
                  <TableCell className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900">{rental.tenant.name}</p>
                    <p className="text-xs text-slate-500">{rental.tenant.email}</p>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900 truncate max-w-[200px]">{rental.property.title}</p>
                    <p className="text-xs text-slate-500">{rental.property.address}</p>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold", status.bg, status.color)}>
                      <span className={cn("h-1.5 w-1.5 rounded-full", status.dot)} />
                      {status.label}
                    </span>
                  </TableCell>
                  <TableCell className="text-right px-6 py-4">
                    <RentalRowActions rentalId={rental.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {requests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <FileText className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">No rental requests</h3>
            <p className="mt-1 text-xs text-slate-500">Requests from tenants will appear here.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default RentalsList;