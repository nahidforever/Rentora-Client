import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Building2, Layers3, ShieldCheck } from "lucide-react";

import AdminPropertiesTable from "@/components/dashboard/AdminPropertiesTable";
import { getTokenServer } from "@/lib/getTokenServer";

export default async function AllPropertiesPage({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/properties?page=${page}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  const properties = Array.isArray(data?.properties) ? data.properties : [];

  const totalPages = Number(data?.totalPages) || 1;

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
              <Building2 size={20} className="sm:h-[23px] sm:w-[23px]" />
            </div>

            <div className="min-w-0">
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-600 sm:mb-1 sm:text-xs sm:tracking-[0.16em]">
                Property Management
              </p>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:mt-1.5 sm:text-sm sm:leading-6">
                Review and manage all submitted properties across the Rentora
                platform.
              </p>
            </div>
          </div>

          {/* Header Statistics */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/90 px-3 py-2.5 shadow-sm sm:min-w-32 sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 sm:h-10 sm:w-10 sm:rounded-xl">
                <Layers3 size={16} className="sm:h-[18px] sm:w-[18px]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400 sm:text-[9px] sm:tracking-[0.13em]">
                  Current Page
                </p>

                <p className="text-base font-black text-slate-900 sm:text-lg">
                  {page}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/90 px-3 py-2.5 shadow-sm sm:min-w-32 sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-600 sm:h-10 sm:w-10 sm:rounded-xl">
                <ShieldCheck size={16} className="sm:h-[18px] sm:w-[18px]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400 sm:text-[9px] sm:tracking-[0.13em]">
                  Total Pages
                </p>

                <p className="text-base font-black text-slate-900 sm:text-lg">
                  {totalPages}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Section */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] sm:rounded-3xl">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">
              Submitted Properties
            </h2>

            <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
              View, review and manage property listings.
            </p>
          </div>

          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

              <span className="relative inline-flex h-full w-full rounded-full bg-emerald-500" />
            </span>

            <span>{properties.length} items</span>
          </div>
        </div>

        {/* Existing Table */}
        <div className="min-w-0">
          <AdminPropertiesTable properties={properties} />
        </div>
      </div>

      {/* Page Navigation */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_8px_30px_rgba(15,23,42,0.05)] sm:rounded-3xl sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Page Information */}
          <p className="text-center text-xs text-slate-500 sm:text-left sm:text-sm">
            Page <span className="font-bold text-slate-900">{page}</span> of{" "}
            <span className="font-bold text-slate-900">{totalPages}</span>
          </p>

          {/* Navigation Controls */}
          <div className="min-w-0 overflow-x-auto">
            <div className="flex w-max min-w-full items-center justify-center gap-1.5 sm:justify-end sm:gap-2">
              {/* Previous */}
              <Link
                href={`/dashboard/admin/all-properties?page=${page - 1}`}
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
                    href={`/dashboard/admin/all-properties?page=${pageNumber}`}
                    aria-current={page === pageNumber ? "page" : undefined}
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
                href={`/dashboard/admin/all-properties?page=${page + 1}`}
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
    </section>
  );
}
