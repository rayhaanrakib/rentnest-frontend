"use client";

import { generateInitials } from "@/lib/utils";
import { IUser } from "@/types";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Loader2,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface DashboardHomeProps {
  user: IUser | null;
  isLoading: boolean;
}

const DashboardHome = ({ user, isLoading }: DashboardHomeProps) => {
  if (isLoading || !user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Details */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm"
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
                    width={200}
                    height={200}
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
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
