"use client";

import { cn, generateInitials } from "@/lib/utils";
import type { User } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "./Links";


interface NavbarProps {
  user: User | null;
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll style change
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  // Handle click outside for user dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDashboardPath = () => {
    if (!user) return "/auth/login";
    switch (user.role) {
      case "TENANT":
        return "/dashboard/tenant";
      case "LANDLORD":
        return "/dashboard/landlord";
      case "ADMIN":
        return "/dashboard/admin";
      default:
        return "/";
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "py-3" : "py-5"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className={cn(
            "flex h-16 items-center justify-between transition-all duration-300",
            isScrolled
              ? "rounded-2xl border border-border/60 bg-background/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-4 sm:px-6"
              : "rounded-2xl border border-transparent bg-transparent px-4 sm:px-6"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2 cursor-pointer">
            <span className="text-2xl font-bold tracking-tight">
              <span className="gradient-text">Rent</span>Nest
            </span>
          </Link>

          {/* Center Navigation (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 p-1 rounded-full bg-muted/30">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative cursor-pointer px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 z-10",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-background shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <div
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex cursor-pointer items-center gap-2 rounded-full p-1 pr-2 transition-all hover:bg-muted"
                >
                  <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-brand-500 to-brand-700 text-xs font-semibold text-white">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={36}
                        height={36}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      generateInitials(user.name)
                    )}
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      isUserMenuOpen && "rotate-180"
                    )}
                  />
                </div>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-border bg-background shadow-xl"
                    >
                      <div className="border-b border-border p-4">
                        <p className="font-semibold text-foreground">{user.name}</p>
                        <p className="mt-0.5 truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                        <span className="mt-3 inline-flex rounded-full bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-700">
                          {user.role}
                        </span>
                      </div>

                      <div className="p-2">
                        <Link
                          href={getDashboardPath()}
                          className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                        >
                          <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
                          Dashboard
                        </Link>

                        <form>
                          <button
                            type="submit"
                            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="cursor-pointer rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="cursor-pointer rounded-xl p-2 transition-colors hover:bg-muted lg:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-2">
              <div className="rounded-2xl border border-border bg-background shadow-xl overflow-hidden">

                {/* Mobile Nav Links */}
                <div className="p-3 space-y-1">
                  {navLinks.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block cursor-pointer rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          active
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile User Section */}
                <div className="border-t border-border p-4 space-y-4">
                  {user ? (
                    <>
                      {/* User Info Block */}
                      <div className="flex items-center gap-3 pb-4 border-b border-border">
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-brand-500 to-brand-700 text-sm font-semibold text-white shrink-0">
                          {user.avatar ? (
                            <Image
                              src={user.avatar}
                              alt={user.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            generateInitials(user.name)
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate">{user.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>

                      {/* Dashboard Link */}
                      <Link
                        href={getDashboardPath()}
                        className="flex cursor-pointer items-center gap-3 w-full rounded-xl bg-muted px-4 py-3 text-sm font-medium transition-colors hover:bg-muted/80"
                      >
                        <LayoutDashboard className="h-5 w-5 text-foreground" />
                        Go to Dashboard
                      </Link>

                      {/* Logout Button */}
                      <form>
                        <button
                          type="submit"
                          className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
                        >
                          <LogOut className="h-5 w-5" />
                          Logout
                        </button>
                      </form>
                    </>
                  ) : (
                    <Link
                      href="/auth/login"
                      className="block cursor-pointer w-full rounded-xl bg-foreground px-4 py-3 text-center text-sm font-medium text-background transition-opacity hover:opacity-90"
                    >
                      Login / Sign up
                    </Link>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}