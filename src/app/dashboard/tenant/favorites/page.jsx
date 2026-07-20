import Link from "next/link";
import { headers } from "next/headers";

import MyFavoritesTable from "@/components/MyFavoritesTable";
import { getTokenServer } from "@/lib/getTokenServer";
import { auth } from "@/lib/auth";

import { ArrowRight, Heart, Search, ShieldCheck, Sparkles } from "lucide-react";

export default async function FavoritesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const token = await getTokenServer();
  const userEmail = session?.user?.email;

  let favorites = [];

  if (userEmail) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/tenant/favorites/${userEmail}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    const data = await res.json();

    favorites = Array.isArray(data) ? data : [];
  }

  return (
    <section className="space-y-4 sm:space-y-6">
      {/* Favorites Snapshot */}
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
              <Heart
                size={20}
                className="fill-white/15 sm:h-[23px] sm:w-[23px]"
              />
            </div>

            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300 sm:text-xs sm:tracking-[0.17em]">
                  Saved Properties
                </p>

                <span className="hidden items-center gap-1 rounded-full border border-blue-400/20 bg-blue-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-blue-300 sm:inline-flex">
                  <Sparkles size={10} />
                  Personal Collection
                </span>
              </div>

              <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-300 sm:mt-2 sm:text-sm sm:leading-6">
                Review the properties you have saved and quickly return to the
                listings that interest you most.
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
            {/* Favorite Count */}
            <div className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-xl sm:min-w-36 sm:gap-3 sm:rounded-2xl sm:px-3.5 sm:py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-pink-400/15 bg-pink-500/10 text-pink-300 sm:h-10 sm:w-10 sm:rounded-xl">
                <Heart
                  size={16}
                  className="fill-pink-400/20 sm:h-[18px] sm:w-[18px]"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-[8px] font-bold uppercase tracking-[0.1em] text-slate-500 sm:text-[9px] sm:tracking-[0.13em]">
                  Favorites
                </p>

                <p className="text-base font-black text-white sm:text-lg">
                  {favorites.length}
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
                  Collection
                </p>

                <p className="text-xs font-black text-emerald-400 sm:text-sm">
                  Private
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Content */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.06)] sm:rounded-3xl">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-pink-100 bg-pink-50 text-pink-600 sm:h-10 sm:w-10">
              <Heart size={18} className="fill-pink-100" />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                Favorite Properties
              </h2>

              <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                View and manage the properties saved to your collection.
              </p>
            </div>
          </div>

          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-2.5 py-1 text-[10px] font-semibold text-pink-700 sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-500 sm:h-2 sm:w-2" />

            {favorites.length}
            <span className="hidden sm:inline">
              {favorites.length === 1 ? "property" : "properties"}
            </span>
          </div>
        </div>

        {favorites.length > 0 ? (
          /* Existing Favorites Table */
          <div className="min-w-0">
            <MyFavoritesTable favorites={favorites} />
          </div>
        ) : (
          /* Empty State */
          <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden px-5 py-10 text-center sm:min-h-[420px] sm:px-8 sm:py-14">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/[0.06] blur-[80px]" />

            <div className="relative mx-auto max-w-md">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 to-blue-50 text-pink-600 shadow-[0_10px_30px_rgba(219,39,119,0.1)] sm:h-20 sm:w-20 sm:rounded-3xl">
                <Heart className="h-8 w-8 sm:h-10 sm:w-10" />

                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white sm:h-7 sm:w-7">
                  <Search size={13} />
                </span>
              </div>

              <h2 className="mt-1.5 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                No Favorite Properties Yet
              </h2>

              <p className="mt-2.5 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                You have not saved any properties yet. Explore available
                listings and add the properties you like to your favorites.
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
        )}
      </div>
    </section>
  );
}
