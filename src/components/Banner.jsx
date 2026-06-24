"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Banner() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <Image
        src="/home-banner.jpg"
        alt="Rentora Banner"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/50" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 min-h-screen flex items-center py-20 sm:py-24 md:py-20">
        <div className="w-full text-center">
          {/* Heading */}
          <motion.h1
            initial={false}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight"
          >
            Find Your Dream Home With{" "}
            <span className="text-blue-400">Rentora</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={false}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="max-w-3xl mx-auto mt-6 text-base md:text-xl text-gray-200 leading-8"
          >
            Discover apartments, villas, offices and premium rental properties
            from trusted owners. Book your next home with confidence and enjoy a
            seamless rental experience.
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial={false}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-10 max-w-6xl mx-auto backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[32px] shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-4 md:p-6"
          >
            <form
              action="/properties"
              method="GET"
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4"
            >
              {/* Location */}
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="w-full bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 border border-white/20 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Property Type */}
              <select
                name="propertyType"
                className="w-full bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" className="text-black">
                  Property Type
                </option>

                <option value="Apartment" className="text-black">
                  Apartment
                </option>

                <option value="House" className="text-black">
                  House
                </option>

                <option value="Studio" className="text-black">
                  Studio
                </option>

                <option value="Villa" className="text-black">
                  Villa
                </option>

                <option value="Office" className="text-black">
                  Office
                </option>
              </select>

              {/* Min Price */}
              <input
                type="number"
                name="minPrice"
                placeholder="Min Price"
                className="w-full bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 border border-white/20 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Max Price */}
              <input
                type="number"
                name="maxPrice"
                placeholder="Max Price"
                className="w-full bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 border border-white/20 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Button */}
              <button
                type="submit"
                className="w-full rounded-2xl bg-blue-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:scale-[1.02]"
              >
                Search Properties
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
