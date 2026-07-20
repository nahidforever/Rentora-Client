"use client";

import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  ChevronRight,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

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

export default function DashboardTopbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const segments = pathname.split("/").filter(Boolean);

  const pathRole = segments[1] || "tenant";
  const role = session?.user?.role || pathRole;

  const pageKey = segments[2] || role;
  const details = pageDetails[pageKey];

  const pageTitle = details?.title || formatLabel(pageKey) || "Dashboard";

  const pageDescription =
    details?.description || "Manage your Rentora dashboard activities.";

  const userName = session?.user?.name || "Rentora User";
  const userEmail = session?.user?.email || "";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="relative hidden shrink-0 overflow-hidden border-b border-white/10 bg-gradient-to-r from-slate-950 via-[#071426] to-[#0a2540] px-6 py-4 shadow-[0_12px_40px_rgba(2,6,23,0.35)] md:block lg:px-8">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-60 w-60 rounded-full bg-blue-600/20 blur-[100px]" />

      <div className="pointer-events-none absolute -right-20 -top-28 h-64 w-64 rounded-full bg-cyan-500/15 blur-[110px]" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-[450px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[90px]" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" />

      {/* Bottom highlight */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />

      <div className="relative flex min-h-16 items-center justify-between gap-6">
        {/* Left content */}
        <div className="min-w-0">
          {/* Breadcrumb */}
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
            <LayoutDashboard size={14} className="shrink-0 text-blue-400" />

            <span className="text-slate-400">Dashboard</span>

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

          {/* Title */}
          <div className="flex items-center gap-3">
            <h1 className="truncate text-2xl font-black tracking-tight text-white">
              {pageTitle}
            </h1>

            <span className="hidden items-center gap-1 rounded-full border border-blue-400/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300 backdrop-blur-md lg:inline-flex">
              <Sparkles size={11} />
              Workspace
            </span>
          </div>

          {/* Description */}
          <p className="mt-1 max-w-2xl truncate text-sm text-slate-400">
            {pageDescription}
          </p>
        </div>

        {/* Right content */}
        <div className="flex shrink-0 items-center gap-3">
          {/* Role card */}
          <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl xl:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-500/10 text-emerald-400">
              <ShieldCheck size={18} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Current role
              </p>

              <p className="mt-0.5 text-sm font-bold capitalize text-slate-200">
                {role}
              </p>
            </div>
          </div>

          {/* User card */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-blue-400/20 hover:bg-white/[0.1]">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-sm font-bold text-white shadow-[0_8px_22px_rgba(37,99,235,0.32)]">
                {userInitial}
              </div>

              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
            </div>

            {/* User information */}
            <div className="hidden min-w-0 pr-1 lg:block">
              <p className="max-w-40 truncate text-sm font-bold text-white">
                {userName}
              </p>

              <p className="max-w-40 truncate text-xs text-slate-400">
                {userEmail || `${role} account`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
