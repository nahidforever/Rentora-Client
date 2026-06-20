"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { TbHomeStats } from "react-icons/tb";
import { Menu, X, Home } from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const role = session?.user?.role || "tenant";

  const menu = {
    tenant: [
      { label: "Overview", link: "/dashboard/tenant", icon: MdDashboard },
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
      { label: "Profile", link: "/dashboard/tenant/profile", icon: FaUsers },
    ],

    owner: [
      { label: "Overview", link: "/dashboard/owner", icon: MdDashboard },
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
      { label: "Bookings", link: "/dashboard/owner/bookings", icon: BiMoney },
    ],

    admin: [
      { label: "Overview", link: "/dashboard/admin", icon: MdDashboard },
      { label: "Users", link: "/dashboard/admin/users", icon: FaUsers },
      {
        label: "Properties",
        link: "/dashboard/admin/all-properties",
        icon: TbHomeStats,
      },
      { label: "Bookings", link: "/dashboard/admin/bookings", icon: BiMoney },
      {
        label: "Transactions",
        link: "/dashboard/admin/transactions",
        icon: BiMoney,
      },
    ],
  };

  const items = menu[role];

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* MOBILE TOP BAR  */}
      <div className="md:hidden flex items-center justify-between px-4 h-14 bg-slate-900 text-white border-b border-white/10">
        {/* <h2 className="font-bold tracking-wide text-blue-400">Rentora</h2> */}

        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/*  DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 h-screen flex-col bg-slate-900 text-white border-r border-white/10 p-4">
        {/*  HEADER */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-blue-600/20 via-indigo-500/10 to-transparent border border-white/10">
          <h2 className="text-xl font-bold tracking-wide text-blue-400">
            Rentora
          </h2>

          <p className="text-xs text-gray-300 mt-1 leading-relaxed">
            Your next home awaits — Manage everything in one place.
          </p>

          <div className="mt-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-[11px] text-gray-400">
              Everything you manage here
            </span>
          </div>
        </div>

        {/* NAVIGATION  */}
        <nav className="flex flex-col gap-2 flex-1">
          {items.map((item) => {
            const active = isActive(item.link);

            return (
              <Link
                key={item.label}
                href={item.link}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition
                ${
                  active
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* BACK TO HOME  */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </aside>

      {/*  MOBILE DRAWER  */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* BACKDROP */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60"
          />

          {/* SIDEBAR */}
          <div className="absolute left-0 top-0 h-full w-72 bg-slate-900 text-white shadow-xl p-4">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-blue-400">Rentora</h2>

              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* NAV */}
            <nav className="flex flex-col gap-2">
              {items.map((item) => {
                const active = isActive(item.link);

                return (
                  <Link
                    key={item.label}
                    href={item.link}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition
                    ${
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* BACK TO HOME MOBILE */}
            <div className="absolute bottom-4 left-4 right-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 transition"
              >
                <Home size={18} />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
