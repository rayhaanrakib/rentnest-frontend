import { Suspense } from "react";
import { Users } from "lucide-react";
import UserFilters from "../../_components/users/UserFilters";
import UsersPageSkeleton from "../../_components/users/UsersPageSkeleton";
import UsersList from "../../_components/users/UsersList";

const AdminUsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; status?: string }>;
}) => {
  const { role, status } = await searchParams;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
          <Users className="h-3.5 w-3.5" />
          User Management
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          All Users
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          View and manage all registered users on the platform.
        </p>
      </div>

      <UserFilters />

      <Suspense key={`${role}-${status}`} fallback={<UsersPageSkeleton />}>
        <UsersList role={role} status={status} />
      </Suspense>
    </div>
  );
};

export default AdminUsersPage;