import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/icons/sharedIcon";
import { IDashboardNavItem } from "@/types";
import { CalendarDays, Cuboid, FileText, LayoutDashboard, User } from "lucide-react";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export const authLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" },
];

export const footerLinks = [
  {
    title: "Platform",
    links: [
      { href: "/properties", label: "Browse Properties" },
      { href: "/categories", label: "Categories" },
      { href: "/become-landlord", label: "Become a Landlord" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/help", label: "Help Center" },
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  },
];

export const socialLinks = [
  { href: "#", label: "Facebook", Icon: FacebookIcon },
  { href: "#", label: "Twitter", Icon: TwitterIcon },
  { href: "#", label: "Instagram", Icon: InstagramIcon },
  { href: "#", label: "LinkedIn", Icon: LinkedinIcon },
];

// dashboard links
const TENANT_SIDEBAR_ITEMS: IDashboardNavItem[] = [
  {
    href: "/tenant/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/tenant/dashboard/requests",
    label: "My Requests",
    icon: FileText,
  },
];
const LANDLORD_SIDEBAR_ITEMS: IDashboardNavItem[] = [
  {
    href: "/landlord/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/landlord/dashboard/properties",
    label: "My Properties",
    icon: FileText,
  },
  {
    href: "/landlord/dashboard/rentals",
    label: "My Rentals",
    icon: CalendarDays,
  }
];
const ADMIN_SIDEBAR_ITEMS: IDashboardNavItem[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Users",
    href: "/admin/dashboard/users",
    icon: User,
  },
  {
    label: "Categories",
    href: "/admin/dashboard/categories",
    icon: Cuboid,
  },
];

export const DashboardNavItems = {
  TENANT: TENANT_SIDEBAR_ITEMS,
  LANDLORD: LANDLORD_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
