"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { TbHomeStats } from "react-icons/tb";

import {
  ArrowLeft,
  ChevronRight,
  Home,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";

const VALID_ROLES = ["admin", "owner", "tenant"];

const menu = {
  tenant: [
    {
      label: "Overview",
      link: "/dashboard/tenant",
      icon: MdDashboard,
    },
    {
      label: "My Bookings",
      link: "/dashboard/tenant/bookings",
      icon: TbHomeStats,
    },
    {
      label: "Favorites",
      link: "/dashboard/tenant/favorites",
      icon: BiMoney,
    },
    {
      label: "Profile",
      link: "/dashboard/tenant/profile",
      icon: FaUsers,
    },
  ],

  owner: [
    {
      label: "Overview",
      link: "/dashboard/owner",
      icon: MdDashboard,
    },
    {
      label: "Add Property",
      link: "/dashboard/owner/add-property",
      icon: TbHomeStats,
    },
    {
      label: "My Properties",
      link: "/dashboard/owner/my-properties",
      icon: FaUsers,
    },
    {
      label: "Bookings",
      link: "/dashboard/owner/bookings",
      icon: BiMoney,
    },
    {
      label: "Profile",
      link: "/dashboard/owner/profile",
      icon: FaUsers,
    },
  ],

  admin: [
    {
      label: "Overview",
      link: "/dashboard/admin",
      icon: MdDashboard,
    },
    {
      label: "Users",
      link: "/dashboard/admin/users",
      icon: FaUsers,
    },
    {
      label: "Properties",
      link: "/dashboard/admin/all-properties",
      icon: TbHomeStats,
    },
    {
      label: "Bookings",
      link: "/dashboard/admin/bookings",
      icon: BiMoney,
    },
    {
      label: "Transactions",
      link: "/dashboard/admin/transactions",
      icon: BiMoney,
    },
    {
      label: "Profile",
      link: "/dashboard/admin/profile",
      icon: FaUsers,
    },
  ],
};

const roleDetails = {
  tenant: {
    title: "Tenant Portal",
    description: "Manage bookings and saved properties",
  },

  owner: {
    title: "Owner Portal",
    description: "Manage properties and rental activities",
  },

  admin: {
    title: "Admin Portal",
    description: "Manage the complete Rentora platform",
  },
};

/* ---------------------------------------------
   Navigation Component
   Declared outside the main component
--------------------------------------------- */
function SidebarNavigation({ items, pathname, mobile = false, onNavigate }) {
  return (
    <nav className="flex flex-col gap-1.5">
      {items.map((item) => {
        const active = pathname === item.link;
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.link}
            onClick={() => {
              if (mobile && onNavigate) {
                onNavigate();
              }
            }}
            className={`group relative flex min-h-12 items-center gap-3 overflow-hidden rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-300 ${
              active
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_10px_25px_rgba(37,99,235,0.28)]"
                : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
            }`}
          >
            {/* Active Indicator */}
            {active && (
              <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-cyan-300" />
            )}

            {/* Navigation Icon */}
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                active
                  ? "bg-white/15 text-white"
                  : "bg-white/[0.05] text-slate-400 group-hover:bg-white/10 group-hover:text-blue-300"
              }`}
            >
              <Icon size={19} />
            </span>

            {/* Navigation Label */}
            <span className="min-w-0 flex-1 truncate">{item.label}</span>

            {/* Navigation Arrow */}
            <ChevronRight
              size={16}
              className={`shrink-0 transition-all duration-300 ${
                active
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}

export default function DashboardSidebar({ initialUser }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const pathRole = segments[1];

  const sessionRole = VALID_ROLES.includes(initialUser?.role)
    ? initialUser.role
    : null;

  const validPathRole = VALID_ROLES.includes(pathRole) ? pathRole : null;

  const role = sessionRole || validPathRole || "tenant";

  const userName = initialUser?.name?.trim() || "Rentora User";
  const userEmail = initialUser?.email || "";
  const userInitial = userName.charAt(0).toUpperCase() || "R";

  const items = menu[role] || menu.tenant;
  const currentRoleDetails = roleDetails[role] || roleDetails.tenant;

  return (
    <>
      {/* =========================================
          Mobile Top Bar
      ========================================= */}
      <header className="relative z-40 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur-xl md:hidden">
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)]">
            <Home size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-extrabold tracking-tight text-slate-900">
              Rentora
            </h2>

            <p className="truncate text-xs font-medium capitalize text-slate-500">
              {role} dashboard
            </p>
          </div>
        </div>

        {/* Menu Button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open dashboard menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 shadow-sm transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/15"
        >
          <Menu size={21} />
        </button>
      </header>

      {/* =========================================
          Desktop Sidebar
      ========================================= */}
      <aside className="relative hidden h-dvh w-[280px] shrink-0 flex-col overflow-hidden border-r border-white/10 bg-slate-950 text-white shadow-[12px_0_45px_rgba(15,23,42,0.08)] md:flex">
        {/* Decorative Glows */}
        <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-blue-600/15 blur-[100px]" />

        <div className="pointer-events-none absolute -right-24 bottom-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-[110px]" />

        {/* Brand Section */}
        <div className="relative shrink-0 px-5 pb-4 pt-5">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-4 shadow-[0_15px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl">
            {/* Top Highlight */}
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_10px_25px_rgba(37,99,235,0.32)]">
                <Home size={23} />
              </div>

              <div className="min-w-0">
                <h2 className="text-xl font-black tracking-tight text-white">
                  Rentora
                </h2>

                <p className="truncate text-xs font-medium text-blue-200/80">
                  Rental Management
                </p>
              </div>
            </div>

            {/* Role Portal Information */}
            <div className="mt-4 rounded-xl border border-white/[0.07] bg-slate-900/50 p-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>

                <span className="text-xs font-semibold text-slate-200">
                  {currentRoleDetails.title}
                </span>
              </div>

              <p className="mt-1.5 text-[11px] leading-4 text-slate-400">
                {currentRoleDetails.description}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="relative min-h-0 flex-1 overflow-y-auto px-5 pb-4">
          <div className="mb-3 flex items-center justify-between px-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Navigation
            </p>

            <ShieldCheck size={15} className="text-blue-400/80" />
          </div>

          <SidebarNavigation items={items} pathname={pathname} />
        </div>

        {/* Desktop Bottom Section */}
        <div className="relative shrink-0 border-t border-white/[0.08] bg-slate-950/60 p-5 backdrop-blur-xl">
          <Link
            href="/"
            className="group flex min-h-11 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-500/10 hover:text-white"
          >
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Home
          </Link>
        </div>
      </aside>

      {/* =========================================
          Mobile Drawer
      ========================================= */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close dashboard menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <aside
          className={`absolute left-0 top-0 flex h-full w-[290px] max-w-[85vw] flex-col overflow-hidden border-r border-white/10 bg-slate-950 text-white shadow-[20px_0_60px_rgba(0,0,0,0.4)] transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="relative shrink-0 border-b border-white/[0.08] p-5">
            <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-blue-600/20 blur-[80px]" />

            <div className="relative flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_8px_25px_rgba(37,99,235,0.3)]">
                  <Home size={21} />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-black tracking-tight text-white">
                    Rentora
                  </h2>

                  <p className="truncate text-xs font-medium capitalize text-blue-300">
                    {role} dashboard
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close dashboard menu"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition-all duration-300 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Mobile User Information */}
          <div className="shrink-0 px-4 pt-4">
            <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-3">
              <div className="relative shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white">
                  {userInitial}
                </div>

                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">
                  {userName}
                </p>

                <p className="truncate text-xs text-slate-400">
                  {userEmail || `${role} account`}
                </p>
              </div>

              <span className="shrink-0 rounded-lg border border-blue-400/15 bg-blue-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-blue-300">
                {role}
              </span>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
            <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Navigation
            </p>

            <SidebarNavigation
              items={items}
              pathname={pathname}
              mobile
              onNavigate={() => setOpen(false)}
            />
          </div>

          {/* Mobile Back to Home */}
          <div className="shrink-0 border-t border-white/[0.08] p-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="group flex min-h-12 items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.05] px-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-500/10 hover:text-white"
            >
              <ArrowLeft
                size={17}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to Home
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
