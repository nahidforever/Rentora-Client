"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

import { HiHome } from "react-icons/hi";
import { BiLogOut } from "react-icons/bi";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();
  if (pathname.includes("dashboard")) {
    return null;
  }

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/75 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 lg:px-6">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>

          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <HiHome className="text-white text-lg" />
            </div>

            <span className="font-semibold text-lg tracking-tight text-gray-800 group-hover:text-blue-600 transition">
              Rentora
            </span>
          </Link>
        </div>

        {/* CENTER */}
        <ul className="hidden md:flex items-center gap-1">
          <li>
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-gray-100 hover:text-blue-600 transition"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/properties"
              className="px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-gray-100 hover:text-blue-600 transition"
            >
              All Properties
            </Link>
          </li>

          {user && (
            <li>
              <Link
                href={`/dashboard/${user?.role}`}
                className="px-4 py-2 rounded-full text-gray-700 font-medium hover:bg-gray-100 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {!user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button
                  size="sm"
                  className="h-10 px-5 rounded-full border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-100 hover:border-gray-300 transition"
                >
                  Login
                </Button>
              </Link>

              <Link href="/signup">
                <Button
                  size="sm"
                  className="h-10 px-5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-sm hover:shadow-md hover:scale-[1.02] transition"
                >
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleLogout}
                className="h-10 px-5 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold shadow-sm hover:shadow-md hover:scale-[1.02] transition"
              >
                <BiLogOut className="mr-1" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl">
          <div className="flex flex-col gap-2 p-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              Home
            </Link>

            <Link
              href="/properties"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              All Properties
            </Link>

            {user && (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
              >
                Dashboard
              </Link>
            )}

            {!user ? (
              <div className="flex flex-col gap-3 mt-3">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full h-11 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50">
                    Login
                  </Button>
                </Link>

                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button className="w-full h-11 rounded-lg bg-blue-600 text-white font-semibold">
                    Register
                  </Button>
                </Link>
              </div>
            ) : (
              <Button
                className="w-full h-11 mt-4 rounded-lg bg-red-500 text-white font-semibold"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
