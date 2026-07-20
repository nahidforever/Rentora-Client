import AdminBookingsTable from "@/components/dashboard/AdminBookingsTable";
import { getTokenServer } from "@/lib/getTokenServer";

import { CalendarCheck2, ClipboardList, ShieldCheck } from "lucide-react";

export default async function AdminBookingsPage() {
  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/bookings`,
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
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_35px_rgba(15,23,42,0.06)] sm:rounded-3xl sm:p-6">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-[75px]" />

        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-cyan-400/10 blur-[85px]" />

        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          {/* Header Content */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_8px_20px_rgba(37,99,235,0.25)] sm:h-12 sm:w-12 sm:rounded-2xl">
              <CalendarCheck2 size={20} className="sm:h-[23px] sm:w-[23px]" />
            </div>

            <div className="min-w-0">
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600 sm:mb-1 sm:text-xs sm:tracking-[0.16em]">
                Booking Management
              </p>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:mt-1.5 sm:text-sm sm:leading-6">
                Monitor and manage all booking activities across the Rentora
                platform.
              </p>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/90 px-3 py-2.5 shadow-sm sm:min-w-36 sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 sm:h-10 sm:w-10 sm:rounded-xl">
                <ClipboardList size={16} className="sm:h-[18px] sm:w-[18px]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400 sm:text-[9px] sm:tracking-[0.13em]">
                  Total Bookings
                </p>

                <p className="text-base font-black text-slate-900 sm:text-lg">
                  {bookingList.length}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/90 px-3 py-2.5 shadow-sm sm:min-w-36 sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-600 sm:h-10 sm:w-10 sm:rounded-xl">
                <ShieldCheck size={16} className="sm:h-[18px] sm:w-[18px]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400 sm:text-[9px] sm:tracking-[0.13em]">
                  Platform Status
                </p>

                <p className="text-xs font-black text-emerald-600 sm:text-sm">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Table Section */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] sm:rounded-3xl">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">
              Booking Records
            </h2>

            <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
              Review booking details and manage booking activities.
            </p>
          </div>

          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

              <span className="relative inline-flex h-full w-full rounded-full bg-emerald-500" />
            </span>
            {bookingList.length} items
          </div>
        </div>

        {/* Existing Booking Table */}
        {bookingList.length > 0 ? (
          <div className="min-w-0">
            <AdminBookingsTable bookings={bookingList} />
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 py-12 text-center sm:min-h-80">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400 sm:h-16 sm:w-16 sm:rounded-3xl">
              <CalendarCheck2 size={27} />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-800 sm:text-lg">
              No bookings found
            </h3>

            <p className="mt-1.5 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
              Booking records will appear here when users submit property
              bookings.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
