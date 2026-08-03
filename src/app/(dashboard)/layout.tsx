import DashboardNavbar from '@/components/shared/layout/DashboardNavbar'
import React, { Suspense } from 'react'
import { getCurrentUser } from '@auth/_actions/authActions';
import DashboardNavSkeleton from '@/components/shared/layout/DashboardNavSkeleton';

const Dashboardlayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();


   return (
    <div className="min-h-screen bg-slate-50 w-full lg:pl-72 pb-28 lg:pb-8">
      <Suspense fallback={<DashboardNavSkeleton />}>
      <DashboardNavbar user={user} />
      </Suspense>
      <main className="px-4 md:px-8 pt-32 lg:pt-10 max-w-5xl mx-auto w-full">
        {children}
      </main>
    </div>
  )
}

export default Dashboardlayout
