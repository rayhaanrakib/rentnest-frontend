"use client";

import DashboardHome from "@/components/shared/layout/DashboardHome";
import DashboardHomeSkeleton from "@/components/shared/layout/DashboardHomeSkeleton";
import { IUser } from "@/types";
import { getCurrentUser } from "@auth/_actions/authActions";
import { Suspense, useEffect, useState } from "react";

const AdminDashboardPage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Suspense fallback={<DashboardHomeSkeleton />}>
      <DashboardHome user={user} isLoading={isLoading} />
    </Suspense>
  );
};

export default AdminDashboardPage;
