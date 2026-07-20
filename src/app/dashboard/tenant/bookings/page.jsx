import Link from "next/link";
import MyBookingsTable from "@/components/dashboard/MyBookingsTable";
import { getTokenServer } from "@/lib/getTokenServer";

import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineCalendar,
} from "react-icons/hi";

import {
  ArrowRight,
  CalendarCheck2,
  Clock3,
  Search,
  ShieldCheck,
} from "lucide-react";

export default async function MyBookingsPage({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tenant/bookings?page=${page}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  const bookingList = Array.isArray(data?.bookings) ? data.bookings : [];

  const totalPages = Number(data?.totalPages) || 1;

  return (
    <section className="space-y-4 sm:space-y-6">
      {/* Booking Snapshot */}
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

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          {/* Header Content */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_10px_25px_rgba(37,99,235,0.32)] sm:h-12 sm:w-12 sm:rounded-2xl">
              <CalendarCheck2 size={20} className="sm:h-[23px] sm:w-[23px]" />
            </div>

            <div className="min-w-0">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300 sm:text-xs sm:tracking-[0.17em]">
                Rental History
              </p>

              <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-300 sm:mt-2 sm:text-sm sm:leading-6">
                Review your property bookings, track their progress and manage
                your rental activity.
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            {/* Booking Count */}
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-xl sm:min-w-36 sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/10 text-blue-300 sm:h-10 sm:w-10 sm:rounded-xl">
                <Clock3 size={16} className="sm:h-[18px] sm:w-[18px]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[8px] font-bold uppercase tracking-[0.1em] text-slate-500 sm:text-[9px] sm:tracking-[0.13em]">
                  Bookings
                </p>

                <p className="text-base font-black text-white sm:text-lg">
                  {bookingList.length}
                </p>
              </div>
            </div>

            {/* Account Status */}
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

      {/* Booking Records */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] sm:rounded-3xl">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 sm:h-10 sm:w-10">
              <HiOutlineCalendar className="text-lg sm:text-xl" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                Booking Records
              </h2>

              <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                View details and follow the progress of your bookings.
              </p>
            </div>
          </div>

          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 sm:h-2 sm:w-2" />

            {bookingList.length}
            <span className="hidden sm:inline">
              {bookingList.length === 1 ? "booking" : "bookings"}
            </span>
          </div>
        </div>

        {bookingList.length === 0 ? (
          /* Empty State */
          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden px-5 py-10 text-center sm:min-h-[420px] sm:px-8 sm:py-14">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.06] blur-[80px]" />

            <div className="relative mx-auto max-w-md">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-[0_10px_30px_rgba(37,99,235,0.1)] sm:h-20 sm:w-20 sm:rounded-3xl">
                <HiOutlineCalendar className="text-3xl sm:text-4xl" />

                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white sm:h-7 sm:w-7">
                  <Search size={13} />
                </span>
              </div>

              <h2 className="mt-1.5 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                No Bookings Yet
              </h2>

              <p className="mt-2.5 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                You have not booked any properties yet. Explore available
                properties and find the right home for you.
              </p>

              <Link
                href="/properties"
                className="group mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.38)] sm:mt-6 sm:h-12 sm:rounded-2xl sm:px-6"
              >
                Browse Properties
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Existing Booking Table */}
            <div className="min-w-0">
              <MyBookingsTable bookings={bookingList} />
            </div>

            {/* Page Navigation */}
            <div className="border-t border-slate-200 bg-slate-50/60 px-3 py-3 sm:px-5 sm:py-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Page Information */}
                <p className="text-center text-xs text-slate-500 sm:text-left sm:text-sm">
                  Page <span className="font-bold text-slate-900">{page}</span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-900">{totalPages}</span>
                </p>

                {/* Controls */}
                <div className="min-w-0 overflow-x-auto">
                  <div className="flex w-max min-w-full items-center justify-center gap-1.5 sm:justify-end sm:gap-2">
                    {/* Previous */}
                    <Link
                      href={`/dashboard/tenant/bookings?page=${page - 1}`}
                      aria-disabled={page === 1}
                      tabIndex={page === 1 ? -1 : undefined}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-200 sm:h-10 sm:w-auto sm:gap-1.5 sm:rounded-xl sm:px-4 ${
                        page === 1
                          ? "pointer-events-none border-slate-200 bg-slate-100 text-slate-400"
                          : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <HiChevronLeft className="text-base sm:text-lg" />

                      <span className="hidden sm:inline">Previous</span>
                    </Link>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, index) => {
                      const pageNumber = index + 1;

                      return (
                        <Link
                          key={pageNumber}
                          href={`/dashboard/tenant/bookings?page=${pageNumber}`}
                          aria-current={
                            page === pageNumber ? "page" : undefined
                          }
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-all duration-200 sm:h-10 sm:w-10 sm:rounded-xl sm:text-sm ${
                            page === pageNumber
                              ? "border-blue-600 bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_6px_16px_rgba(37,99,235,0.25)]"
                              : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        >
                          {pageNumber}
                        </Link>
                      );
                    })}

                    {/* Next */}
                    <Link
                      href={`/dashboard/tenant/bookings?page=${page + 1}`}
                      aria-disabled={page === totalPages}
                      tabIndex={page === totalPages ? -1 : undefined}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold transition-all duration-200 sm:h-10 sm:w-auto sm:gap-1.5 sm:rounded-xl sm:px-4 ${
                        page === totalPages
                          ? "pointer-events-none border-slate-200 bg-slate-100 text-slate-400"
                          : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <span className="hidden sm:inline">Next</span>

                      <HiChevronRight className="text-base sm:text-lg" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
