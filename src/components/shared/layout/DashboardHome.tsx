"use client";

import { generateInitials } from "@/lib/utils";
import { IUser } from "@/types";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DashboardHomeProps {
  user: IUser | null;
  isLoading: boolean;
}


const dashboardSidebarData = {
  accountStatus: "Active",
  memberSince: null as string | null,
  profileCompletion: 85,
  recentActivity: [
    { id: 1, label: "Logged in", time: "2m ago" },
    { id: 2, label: "Profile updated", time: "1m ago" },
    { id: 3, label: "Password changed", time: "5m ago" },
  ],
};

const DashboardHome = ({ user, isLoading }: DashboardHomeProps) => {
  if (isLoading || !user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  const memberSinceDate = dashboardSidebarData.memberSince ?? user.createdAt;

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
      >
        <div>
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-brand-700 bg-brand-50 rounded-full mb-3 border border-brand-100">
            Dashboard
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900">
            Welcome back, {user.name.split(" ")[0]}.
          </h1>
        </div>
        <Link
          href="/properties"
          className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all shadow-sm w-fit"
        >
          Find New Property
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </motion.div>

      {/* Main grid: content + sidebar (sidebar only from xl up) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Account Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="xl:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">
            Account Details
          </h2>

          <div className="flex flex-col sm:flex-row items-start gap-6 pb-6 border-b border-slate-100">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-2xl">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  sizes="w-100vw"
                  className="object-cover"
                />
              ) : (
                generateInitials(user.name)
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                {user.name}
              </h3>
              <p className="text-slate-500 flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4" /> {user.email}
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-medium">
                <BadgeCheck className="h-3 w-3" /> {user.status}
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-500 shadow-sm">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Phone Number</p>
                <p className="text-sm font-medium text-slate-800">
                  {user.phone || "Not provided"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-500 shadow-sm">
                <CalendarDays className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Member Since</p>
                <p className="text-sm font-medium text-slate-800">
                  {new Date(memberSinceDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Sidebar — desktop (xl+) only */}
        <div className="hidden xl:flex xl:col-span-1 flex-col gap-6">
          {/* Account Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium tracking-wider uppercase text-slate-400">
                Account Status
              </p>
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="mt-3 text-lg font-bold text-slate-900">
              {dashboardSidebarData.accountStatus}
            </p>
          </motion.div>

          {/* Profile Completion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium tracking-wider uppercase text-slate-400">
                Profile Completion
              </p>
              <span className="text-sm font-bold text-slate-900">
                {dashboardSidebarData.profileCompletion}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${dashboardSidebarData.profileCompletion}%` }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full bg-brand-500"
              />
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
          >
            <p className="text-xs font-medium tracking-wider uppercase text-slate-400 mb-4">
              Recent Activity
            </p>
            <ul className="space-y-4">
              {dashboardSidebarData.recentActivity.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" /> {item.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;