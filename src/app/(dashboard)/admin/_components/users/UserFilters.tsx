"use client";

import { useRouter, useSearchParams } from "next/navigation";

const UserFilters=()=> {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentRole = searchParams.get("role") || "";
  const currentStatus = searchParams.get("status") || "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/admin/dashboard/users?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={currentRole}
        onChange={(e) => updateFilter("role", e.target.value)}
        className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
      >
        <option value="">All Roles</option>
        <option value="TENANT">Tenant</option>
        <option value="LANDLORD">Landlord</option>
      </select>

      <select
        value={currentStatus}
        onChange={(e) => updateFilter("status", e.target.value)}
        className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
      >
        <option value="">All Status</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>
    </div>
  );
}
export default UserFilters;