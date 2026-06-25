"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.includes("dashboard")) {
    return null;
  }

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] gap-12 xl:gap-16">
          {/* Brand */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">
              Rent<span className="text-blue-500">ora</span>
            </h2>

            <p className="mt-5 text-slate-400 leading-7 lg:max-w-lg mx-auto lg:mx-0">
              Find, book and manage rental properties with ease. Rentora
              connects tenants and property owners through a secure and modern
              rental experience.
            </p>

            <div className="flex justify-center lg:justify-start gap-4 mt-7">
              <a
                href="#"
                aria-label="Facebook"
                className="bg-slate-800 p-3 rounded-xl hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="bg-slate-800 p-3 rounded-xl hover:bg-pink-600 hover:-translate-y-1 transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="bg-slate-800 p-3 rounded-xl hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-5">Quick Links</h3>

            <ul className="space-y-3 text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/properties"
                  className="hover:text-white transition"
                >
                  Properties
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-5">Services</h3>

            <ul className="space-y-3 text-slate-400">
              <li className="hover:text-white transition cursor-pointer">
                Property Listings
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Online Booking
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Secure Payments
              </li>

              <li className="hover:text-white transition cursor-pointer">
                Verified Owners
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-5">Contact Info</h3>

            <div className="space-y-4 text-slate-400">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <MapPin size={18} className="text-blue-500 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Phone size={18} className="text-blue-500 shrink-0" />
                <span>+880 1700-000000</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Mail size={18} className="text-blue-500 shrink-0" />
                <span>support@rentora.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-14 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Rentora. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
