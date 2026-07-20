import OwnerBookingsTable from "@/components/dashboard/OwnerBookingsTable";
import { getTokenServer } from "@/lib/getTokenServer";

import { HiOutlineCalendarDays } from "react-icons/hi2";
import {
  CalendarCheck2,
  Clock3,
  Inbox,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default async function OwnerBookingsPage() {
  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/owner/bookings`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const bookings = await res.json();

  const bookingList = Array.isArray(bookings) ? bookings : [];

  return (
    <section className="space-y-4 sm:space-y-6">
      {/* Booking Snapshot */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-[#071426] to-[#0b2947] p-4 text-white shadow-[0_18px_50px_rgba(2,6,23,0.22)] sm:rounded-3xl sm:p-6 lg:p-7">
        {/* Decorative Glows */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-blue-500/20 blur-[85px]" />

        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-cyan-400/15 blur-[90px]" />

        <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-[80px]" />

        {/* Subtle Grid Pattern */}
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
          {/* Header Content */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_10px_25px_rgba(37,99,235,0.32)] sm:h-12 sm:w-12 sm:rounded-2xl">
              <CalendarCheck2 size={20} className="sm:h-[23px] sm:w-[23px]" />
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300 sm:text-xs sm:tracking-[0.17em]">
                  Rental Activity
                </p>

                <span className="hidden items-center gap-1 rounded-full border border-blue-400/20 bg-blue-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-300 sm:inline-flex">
                  <Sparkles size={10} />
                  Owner Workspace
                </span>
              </div>

              <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-300 sm:mt-2 sm:text-sm sm:leading-6">
                Review and manage booking requests submitted for your rental
                properties.
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            {/* Total Requests */}
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-xl sm:min-w-36 sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/10 text-blue-300 sm:h-10 sm:w-10 sm:rounded-xl">
                <Inbox size={16} className="sm:h-[18px] sm:w-[18px]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[8px] font-bold uppercase tracking-[0.1em] text-slate-500 sm:text-[9px] sm:tracking-[0.13em]">
                  Requests
                </p>

                <p className="text-base font-black text-white sm:text-lg">
                  {bookingList.length}
                </p>
              </div>
            </div>

            {/* Management Status */}
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-xl sm:min-w-36 sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-500/10 text-emerald-400 sm:h-10 sm:w-10 sm:rounded-xl">
                <ShieldCheck size={16} className="sm:h-[18px] sm:w-[18px]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[8px] font-bold uppercase tracking-[0.1em] text-slate-500 sm:text-[9px] sm:tracking-[0.13em]">
                  Management
                </p>

                <p className="text-xs font-black text-emerald-400 sm:text-sm">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Requests Section */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] sm:rounded-3xl">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 sm:h-10 sm:w-10">
              <HiOutlineCalendarDays className="text-lg sm:text-xl" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                Received Requests
              </h2>

              <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                Review booking details and manage tenant requests.
              </p>
            </div>
          </div>

          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs">
            <Clock3 size={12} />
            {bookingList.length}{" "}
            <span className="hidden sm:inline">
              {bookingList.length === 1 ? "request" : "requests"}
            </span>
          </div>
        </div>

        {bookingList.length === 0 ? (
          /* Empty State */
          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden px-5 py-10 text-center sm:min-h-[420px] sm:px-8 sm:py-14">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.06] blur-[80px]" />

            <div className="relative mx-auto max-w-md">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-[0_10px_30px_rgba(37,99,235,0.1)] sm:h-20 sm:w-20 sm:rounded-3xl">
                <HiOutlineCalendarDays className="text-3xl sm:text-4xl" />

                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white sm:h-7 sm:w-7">
                  <Clock3 size={13} />
                </span>
              </div>

              <h2 className="mt-1.5 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                No Booking Requests Yet
              </h2>

              <p className="mt-2.5 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                You have not received any booking requests for your properties
                yet. New requests will appear here automatically.
              </p>
            </div>
          </div>
        ) : (
          /* Existing Bookings Table */
          <div className="min-w-0">
            <OwnerBookingsTable bookings={bookingList} />
          </div>
        )}
      </div>
    </section>
  );
}
