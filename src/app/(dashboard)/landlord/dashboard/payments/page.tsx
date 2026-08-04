import React, { Suspense } from "react";
import { getLandlordRentals } from "@dashboard/landlord/_actions/landlordActions";

const TableSkeleton = () => {
  return (
    <div className="space-y-4 p-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-4 animate-pulse">
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
          <div className="h-4 bg-slate-200 rounded w-1/6"></div>
          <div className="h-4 bg-slate-200 rounded w-1/6"></div>
          <div className="h-4 bg-slate-200 rounded w-1/6 ml-auto"></div>
        </div>
      ))}
    </div>
  );
};

const PaymentsTable = ({ payments }: { payments: any[] }) => {
  let totalEarnings = 0;
  for (const req of payments) {
    if (req.payment?.status === "COMPLETED") {
      totalEarnings += req.payment.amount;
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Total Completed Earnings</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalEarnings)}
          </p>
        </div>
        <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
          {payments.length} Active Rentals
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {payments.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm font-medium text-slate-800 mb-1">No active payments yet</p>
            <p className="text-sm text-slate-500">Payments will appear here once tenants pay for approved rentals.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-500 bg-slate-50">
                  <th className="font-medium px-6 py-3">Property</th>
                  <th className="font-medium px-6 py-3">Tenant</th>
                  <th className="font-medium px-6 py-3">Amount</th>
                  <th className="font-medium px-6 py-3">Date Paid</th>
                  <th className="font-medium px-6 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((req) => (
                  <tr key={req.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">

                    <td className="px-6 py-4 font-medium text-slate-800">
                      {req.property?.title || "Unknown Property"}
                      <div className="text-xs text-slate-400 font-normal">{req.property?.address}</div>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {req.tenant?.name || "Unknown Tenant"}
                      <div className="text-xs text-slate-400">{req.tenant?.email}</div>
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(req.payment?.amount || 0)}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {new Date(req.payment?.paidAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        req.payment?.status === "COMPLETED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {req.payment?.status || "PENDING"}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const LandlordPaymentsPage = async () => {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payments & Earnings</h1>
        <p className="text-slate-500 text-sm mt-1">Track all completed rental payments from your tenants.</p>
      </div>

      <Suspense fallback={<div className="bg-white rounded-2xl border border-slate-100 shadow-sm"><TableSkeleton /></div>}>
        <AsyncPaymentsLoader />
      </Suspense>
    </div>
  );
};

const AsyncPaymentsLoader = async () => {
  const data = await getLandlordRentals();
  const payments = data.requests.filter((req: any) => req.status === "ACTIVE" && req.payment);

  return <PaymentsTable payments={payments} />;
};

export default LandlordPaymentsPage;