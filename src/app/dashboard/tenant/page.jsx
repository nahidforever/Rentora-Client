import TenantOverviewCards from "@/components/dashboard/TenantOverviewCards";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import {
  Activity,
  BarChart3,
  BookmarkCheck,
  KeyRound,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default async function TenantDashboardPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tenant/dashboard-overview`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const overview = await res.json();

  return (
    <section className="space-y-4 sm:space-y-6">
      {/* Rental Snapshot */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-[#071426] to-[#0b2947] p-4 text-white shadow-[0_18px_50px_rgba(2,6,23,0.22)] sm:rounded-3xl sm:p-6 lg:p-7">
        {/* Decorative Glows */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-blue-500/20 blur-[85px]" />

        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-cyan-400/15 blur-[90px]" />

        <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-[80px]" />

        {/* Subtle Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* Top Highlight */}
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Snapshot Content */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_10px_25px_rgba(37,99,235,0.32)] sm:h-12 sm:w-12 sm:rounded-2xl">
              <KeyRound size={20} className="sm:h-[23px] sm:w-[23px]" />
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300 sm:text-xs sm:tracking-[0.17em]">
                  Personal Rental Hub
                </p>

                <span className="hidden items-center gap-1 rounded-full border border-blue-400/20 bg-blue-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-300 sm:inline-flex">
                  <Sparkles size={10} />
                  Tenant Workspace
                </span>
              </div>

              <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-300 sm:mt-2 sm:text-sm sm:leading-6">
                Manage your bookings, monitor payments and access your saved
                properties from one convenient place.
              </p>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            {/* Rental Activity */}
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-xl sm:min-w-36 sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/10 text-blue-300 sm:h-10 sm:w-10 sm:rounded-xl">
                <Activity size={16} className="sm:h-[18px] sm:w-[18px]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[8px] font-bold uppercase tracking-[0.1em] text-slate-500 sm:text-[9px] sm:tracking-[0.13em]">
                  Activity
                </p>

                <p className="text-xs font-black text-blue-300 sm:text-sm">
                  Updated
                </p>
              </div>
            </div>

            {/* Account Security */}
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-xl sm:min-w-36 sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-500/10 text-emerald-400 sm:h-10 sm:w-10 sm:rounded-xl">
                <ShieldCheck size={16} className="sm:h-[18px] sm:w-[18px]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[8px] font-bold uppercase tracking-[0.1em] text-slate-500 sm:text-[9px] sm:tracking-[0.13em]">
                  Account
                </p>

                <p className="text-xs font-black text-emerald-400 sm:text-sm">
                  Secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Overview */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] sm:rounded-3xl">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 sm:h-10 sm:w-10">
              <BarChart3 size={18} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                Activity Overview
              </h2>

              <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                A summary of your bookings, favorites and rental activities.
              </p>
            </div>
          </div>

          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs">
            <BookmarkCheck size={12} />
            Overview
          </div>
        </div>

        {/* Existing Tenant Overview Cards */}
        <div className="p-4 sm:p-6">
          <TenantOverviewCards overview={overview} />
        </div>
      </div>
    </section>
  );
}
