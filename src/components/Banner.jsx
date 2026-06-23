"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/home-banner.jpg"
        alt="Rentora Banner"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 h-[90vh] flex items-center">
        <div className="w-full text-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
          >
            Find Your Perfect Home <br />
            With <span className="text-blue-400">Rentora</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl mx-auto mt-6 text-gray-200 text-lg leading-8"
          >
            Discover apartments, villas and houses from trusted owners. Book
            your next home with confidence and enjoy a seamless rental
            experience.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 bg-white rounded-3xl shadow-2xl p-5"
          >
            <div className="grid lg:grid-cols-5 gap-4">
              {/* Location */}
              <input
                type="text"
                placeholder="Location"
                className="border rounded-2xl px-4 py-3 outline-none"
              />

              {/* Property Type */}
              <select className="border rounded-2xl px-4 py-3 outline-none">
                <option>Property Type</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Villa</option>
                <option>Office</option>
              </select>

              {/* Min Price */}
              <input
                type="number"
                placeholder="Min Price"
                className="border rounded-2xl px-4 py-3 outline-none"
              />

              {/* Max Price */}
              <input
                type="number"
                placeholder="Max Price"
                className="border rounded-2xl px-4 py-3 outline-none"
              />

              {/* Button */}
              <button className="bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
