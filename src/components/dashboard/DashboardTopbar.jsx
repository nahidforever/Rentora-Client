"use client";

import { usePathname } from "next/navigation";

import { ChevronRight, LayoutDashboard, Sparkles } from "lucide-react";

const VALID_ROLES = ["admin", "owner", "tenant"];

const pageDetails = {
  admin: {
    title: "Admin Dashboard",
    description: "Monitor and manage the complete Rentora platform.",
  },

  owner: {
    title: "Owner Dashboard",
    description: "Manage properties, bookings and rental activities.",
  },

  tenant: {
    title: "Tenant Dashboard",
    description: "Manage bookings, favorites and account information.",
  },

  users: {
    title: "Users",
    description: "View and manage registered Rentora users.",
  },

  "all-properties": {
    title: "All Properties",
    description: "Review and manage property listings on the platform.",
  },

  "add-property": {
    title: "Add Property",
    description: "Create and publish a new rental property listing.",
  },

  "my-properties": {
    title: "My Properties",
    description: "View and manage all of your property listings.",
  },

  bookings: {
    title: "Bookings",
    description: "Review and manage property booking information.",
  },

  transactions: {
    title: "Transactions",
    description: "Monitor rental payments and transaction activities.",
  },

  favorites: {
    title: "Favorites",
    description: "View and manage your saved rental properties.",
  },

  profile: {
    title: "Profile",
    description: "Manage your personal information and account details.",
  },
};

function formatLabel(value = "") {
  return value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function DashboardTopbar({ initialUser }) {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const pathRole = segments[1];

  const sessionRole = VALID_ROLES.includes(initialUser?.role)
    ? initialUser.role
    : null;

  const validPathRole = VALID_ROLES.includes(pathRole) ? pathRole : null;

  const role = sessionRole || validPathRole || "tenant";

  const pageKey = segments[2] || role;
  const details = pageDetails[pageKey];

  const pageTitle = details?.title || formatLabel(pageKey) || "Dashboard";

  const pageDescription =
    details?.description || "Manage your Rentora dashboard activities.";

  const userName = initialUser?.name?.trim() || "Rentora User";
  const userEmail = initialUser?.email || "";
  const userInitial = userName.charAt(0).toUpperCase() || "R";

  return (
    <header className="relative hidden shrink-0 overflow-hidden border-b border-white/10 bg-gradient-to-r from-slate-950 via-[#071426] to-[#0a2540] px-6 py-4 shadow-[0_12px_40px_rgba(2,6,23,0.35)] md:block lg:px-8">
      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-60 w-60 rounded-full bg-blue-600/20 blur-[100px]" />

      <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-cyan-500/15 blur-[110px]" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-[450px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[90px]" />

      {/* Subtle Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Highlights */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />

      {/* Topbar Content */}
      <div className="relative flex min-h-16 items-center justify-between gap-6">
        {/* Left Content */}
        <div className="min-w-0">
          {/* Breadcrumb */}
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <LayoutDashboard size={14} className="shrink-0 text-blue-400" />

            <span>Dashboard</span>

            <ChevronRight size={13} className="shrink-0 text-slate-600" />

            <span className="capitalize text-blue-300">{role}</span>

            {segments[2] && (
              <>
                <ChevronRight size={13} className="shrink-0 text-slate-600" />

                <span className="truncate text-slate-400">
                  {formatLabel(pageKey)}
                </span>
              </>
            )}
          </div>

          {/* Page Title */}
          <div className="flex items-center gap-3">
            <h1 className="truncate text-2xl font-black tracking-tight text-white">
              {pageTitle}
            </h1>

            <span className="hidden items-center gap-1 rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300 backdrop-blur-md lg:inline-flex">
              <Sparkles size={11} />
              Workspace
            </span>
          </div>

          {/* Page Description */}
          <p className="mt-1 max-w-2xl truncate text-sm text-slate-400">
            {pageDescription}
          </p>
        </div>

        {/* User Information */}
        <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.1]">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-sm font-bold text-white shadow-[0_8px_22px_rgba(37,99,235,0.32)]">
              {userInitial}
            </div>

            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
          </div>

          {/* Name and Email */}
          <div className="hidden min-w-0 lg:block">
            <p className="max-w-40 truncate text-sm font-bold text-white">
              {userName}
            </p>

            <p className="max-w-40 truncate text-xs text-slate-400">
              {userEmail || `${role} account`}
            </p>
          </div>

          {/* Role Badge */}
          <span className="hidden shrink-0 rounded-lg border border-blue-400/15 bg-blue-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-blue-300 xl:inline-flex">
            {role}
          </span>
        </div>
      </div>
    </header>
  );
}
