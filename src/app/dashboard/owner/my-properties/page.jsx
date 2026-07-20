import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getOwnerProperties } from "@/lib/api/property";
import MyPropertiesTable from "@/components/dashboard/MyPropertiesTable";
import { getTokenServer } from "@/lib/getTokenServer";
import Link from "next/link";

import { HiHomeModern } from "react-icons/hi2";
import {
  ArrowRight,
  Building2,
  Layers3,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default async function MyPropertiesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const ownerId = session?.user?.id;
  const token = await getTokenServer();

  const properties = await getOwnerProperties(ownerId, token);

  const propertyList = Array.isArray(properties) ? properties : [];

  return (
    <section className="space-y-4 sm:space-y-6">
      {/* Property Portfolio Banner */}
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
          {/* Banner Content */}
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_10px_25px_rgba(37,99,235,0.32)] sm:h-12 sm:w-12 sm:rounded-2xl">
              <Building2 size={20} className="sm:h-[23px] sm:w-[23px]" />
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300 sm:text-xs sm:tracking-[0.17em]">
                  Property Management
                </p>

                <span className="hidden items-center gap-1 rounded-full border border-blue-400/20 bg-blue-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-300 sm:inline-flex">
                  <Sparkles size={10} />
                  Owner Workspace
                </span>
              </div>

              <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-300 sm:mt-2 sm:text-sm sm:leading-6">
                Review, update and manage all your listed rental properties from
                one place.
              </p>
            </div>
          </div>

          {/* Summary and Add Button */}
          <div className="flex flex-col gap-2 xs:flex-row sm:flex-row sm:items-center sm:gap-3">
            {/* Property Count */}
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-xl sm:min-w-36 sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/10 text-blue-300 sm:h-10 sm:w-10 sm:rounded-xl">
                <Layers3 size={16} className="sm:h-[18px] sm:w-[18px]" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[8px] font-bold uppercase tracking-[0.1em] text-slate-500 sm:text-[9px] sm:tracking-[0.13em]">
                  Properties
                </p>

                <p className="text-base font-black text-white sm:text-lg">
                  {propertyList.length}
                </p>
              </div>
            </div>

            {/* Add Property */}
            <Link
              href="/dashboard/owner/add-property"
              className="group flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.4)] sm:h-12 sm:rounded-2xl sm:px-5"
            >
              <Plus size={18} />

              <span>Add Property</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Properties Content */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] sm:rounded-3xl">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 sm:h-10 sm:w-10">
              <HiHomeModern className="text-lg sm:text-xl" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                Listed Properties
              </h2>

              <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                Manage your published rental property listings.
              </p>
            </div>
          </div>

          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs">
            <ShieldCheck size={12} />
            {propertyList.length}{" "}
            <span className="hidden sm:inline">
              {propertyList.length === 1 ? "property" : "properties"}
            </span>
          </div>
        </div>

        {propertyList.length === 0 ? (
          /* Empty State */
          <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden px-5 py-10 text-center sm:min-h-[420px] sm:px-8 sm:py-14">
            {/* Empty State Decorations */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.06] blur-[80px]" />

            <div className="relative mx-auto max-w-md">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 shadow-[0_10px_30px_rgba(37,99,235,0.1)] sm:h-20 sm:w-20 sm:rounded-3xl">
                <HiHomeModern className="text-3xl sm:text-4xl" />

                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white sm:h-7 sm:w-7">
                  <Plus size={14} />
                </span>
              </div>

              <h2 className="mt-1.5 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                No Properties Yet
              </h2>

              <p className="mt-2.5 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                You have not listed any properties yet. Add your first property
                and start receiving booking requests from tenants.
              </p>

              <Link
                href="/dashboard/owner/add-property"
                className="group mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(37,99,235,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(37,99,235,0.38)] sm:mt-6 sm:h-12 sm:rounded-2xl sm:px-6"
              >
                <Plus size={18} />
                Add Your First Property
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        ) : (
          /* Existing Properties Table */
          <div className="min-w-0">
            <MyPropertiesTable properties={propertyList} />
          </div>
        )}
      </div>
    </section>
  );
}
