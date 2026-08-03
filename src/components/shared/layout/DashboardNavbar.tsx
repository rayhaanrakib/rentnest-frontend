"use client";

import { SiteIcon } from "@/components/icons/sharedIcon";
import { cn, generateInitials } from "@/lib/utils";
import type { IDashboardNavItem, IUser } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Home,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DashboardNavItems } from "./Links";

const DashboardNavbar = ({ user }: { user: IUser }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  let navItems: IDashboardNavItem[] = [];
  if (user.role === "TENANT") {
    navItems = DashboardNavItems.TENANT;
  } else if (user.role === "LANDLORD") {
    navItems = DashboardNavItems.LANDLORD;
  } else if (user.role === "ADMIN") {
    navItems = DashboardNavItems.ADMIN;
  }

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const roleLabel = useMemo(() => {
    switch (user.role) {
      case "TENANT":
        return "Tenant";
      case "LANDLORD":
        return "Landlord";
      case "ADMIN":
        return "Admin";
      default:
        return "User";
    }
  }, [user.role]);

  const desktopLayoutId = `${user.role}-nav-active-desktop`;
  const mobileLayoutId = `${user.role}-nav-active-mobile`;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-4 top-4 bottom-4 z-40 hidden w-64 flex-col justify-between overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-2xl lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.05),_transparent_32%)]" />

        <div className="relative">
          <Link href="/" className="mb-10 items-center gap-3">
            <SiteIcon className="h-4 w-auto" />
            <div className="flex flex-col gap-1 mt-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-slate-400">
                {roleLabel} Space
              </p>
              <p className="text-sm font-semibold text-slate-900">Dashboard</p>
            </div>
          </Link>

          <nav className="mt-6 space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.href, item.exact);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all duration-300",
                    active
                      ? "text-white"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId={desktopLayoutId}
                      className="absolute inset-0 -z-10 rounded-2xl bg-slate-900 shadow-[0_12px_28px_rgba(15,23,42,0.18)]"
                      transition={{
                        type: "spring",
                        stiffness: 360,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-xl border transition-all",
                      active
                        ? "border-white/10 bg-white/10 text-white"
                        : "border-slate-200 bg-white text-slate-500 group-hover:border-slate-300 group-hover:text-slate-900"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                  </span>

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="relative space-y-4">
          <Link
            href="/"
            className="group flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 hover:shadow-sm"
          >
            <span className="flex items-center gap-3">
              <Home className="h-4 w-4" />
              Back to Home
            </span>

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <div className="rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white shadow-sm">
                {generateInitials(user.name)}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500">{roleLabel} Account</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile / Tablet Top Bar */}
      <header className="fixed left-4 right-4 top-4 z-50 lg:hidden">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-white/90 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.04),_transparent_32%)]" />

          <div className="relative flex items-center justify-between px-4 py-3.5">
            <Link href="/" className="flex items-center gap-3">
              <SiteIcon className="h-4 w-auto" />
            </Link>

            <button
              type="button"
              aria-label={
                open ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={open}
              aria-controls="mobile-dashboard-nav"
              onClick={() => setOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:text-slate-900"
            >
              <motion.div
                animate={{ rotate: open ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {open ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              id="mobile-dashboard-nav"
              className="fixed left-4 right-4 top-24 z-50 overflow-hidden rounded-[2rem] border border-white/80 bg-white/95 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl lg:hidden"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
            >
              <div className="relative">
                <div className="mb-4 rounded-[1.5rem] border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white shadow-sm">
                      {generateInitials(user.name)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {roleLabel} Account
                      </p>
                    </div>
                  </div>
                </div>

                <nav className="space-y-2">
                  {navItems.map((item) => {
                    const active = isActive(item.href, item.exact);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-2xl px-3 py-3.5 text-sm font-medium transition-all duration-300",
                          active
                            ? "text-white"
                            : "text-slate-600 hover:text-slate-900"
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId={mobileLayoutId}
                            className="absolute inset-0 -z-10 rounded-2xl bg-slate-900 shadow-[0_12px_28px_rgba(15,23,42,0.18)]"
                            transition={{
                              type: "spring",
                              stiffness: 360,
                              damping: 30,
                            }}
                          />
                        )}

                        <span
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl border transition-all",
                            active
                              ? "border-white/10 bg-white/10 text-white"
                              : "border-slate-200 bg-white text-slate-500 group-hover:border-slate-300 group-hover:text-slate-900"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                        </span>

                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                <Link
                  href="/"
                  className="group mt-4 flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-300 hover:border-slate-300 hover:text-slate-900"
                >
                  <span className="flex items-center gap-3">
                    <Home className="h-4 w-4" />
                    Back to Home
                  </span>

                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardNavbar;