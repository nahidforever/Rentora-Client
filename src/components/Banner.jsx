"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";

const bannerSlides = [
  {
    image: "/home-banner-h.png",
    alt: "Modern rental property available through Rentora",
  },
  {
    image: "/home-banner-2.png",
    alt: "Premium apartment available for rent",
  },
  {
    image: "/home-banner-3.png",
    alt: "Beautiful modern house available for rent",
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const fieldClass =
    "h-14 w-full rounded-2xl border border-white/15 bg-white/[0.09] px-4 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-white/55 hover:border-white/30 hover:bg-white/[0.13] focus:border-blue-400/80 focus:bg-white/[0.14] focus:ring-4 focus:ring-blue-500/15";

  useEffect(() => {
    const sliderInterval = window.setInterval(() => {
      setCurrentSlide(
        (previousSlide) => (previousSlide + 1) % bannerSlides.length,
      );
    }, 5500);

    return () => window.clearInterval(sliderInterval);
  }, []);

  const showPreviousSlide = () => {
    setCurrentSlide((previousSlide) =>
      previousSlide === 0 ? bannerSlides.length - 1 : previousSlide - 1,
    );
  };

  const showNextSlide = () => {
    setCurrentSlide(
      (previousSlide) => (previousSlide + 1) % bannerSlides.length,
    );
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-slate-950">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={bannerSlides[currentSlide].image}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1.06 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 1,
                ease: "easeInOut",
              },
              scale: {
                duration: 7,
                ease: "linear",
              },
            }}
            className="absolute inset-0"
          >
            <Image
              src={bannerSlides[currentSlide].image}
              alt={bannerSlides[currentSlide].alt}
              fill
              priority={currentSlide === 0}
              sizes="100vw"
              className="object-cover object-center brightness-[0.96] contrast-[1.05] saturate-[1.08] sm:object-[68%_center]"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Balanced Background Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/35 to-slate-950/5" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/15" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/15 via-transparent to-transparent" />

      {/* Decorative Glows */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[420px] w-[420px] rounded-full bg-blue-600/15 blur-[140px]" />

      <div className="pointer-events-none absolute -right-36 bottom-0 h-[440px] w-[440px] rounded-full bg-cyan-400/10 blur-[150px]" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-52 w-[700px] -translate-x-1/2 rounded-full bg-blue-400/5 blur-[130px]" />

      {/* Subtle Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Main Content */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-28 sm:px-6 lg:px-8">
        <div className="w-full">
          {/* Hero Content */}
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/30 px-4 py-2 text-sm font-medium text-blue-100 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/15">
                <Sparkles size={15} className="text-blue-300" />
              </span>
              Your trusted property rental platform
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-4xl font-black leading-[1.08] tracking-[-0.04em] text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Your Next Home Is
              <span className="relative mx-2 inline-block sm:ml-4">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  Waiting
                </span>

                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full bg-gradient-to-r from-blue-500 via-cyan-300 to-blue-400 opacity-90"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="mx-auto mt-7 max-w-3xl text-base leading-7 text-slate-100 drop-shadow-[0_3px_15px_rgba(0,0,0,0.6)] sm:text-lg md:text-xl md:leading-8"
            >
              Discover verified apartments, houses, villas and offices from
              trusted owners. Find the right space and rent with confidence.
            </motion.p>
          </div>

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative mx-auto mt-10 max-w-6xl overflow-hidden rounded-[30px] border border-white/20 bg-slate-950/40 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-5"
          >
            {/* Inner Highlight */}
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            <div className="relative mb-4 flex items-center gap-2 px-1 text-sm font-semibold text-white/90">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/10">
                <SlidersHorizontal size={16} className="text-blue-300" />
              </span>
              Find a property that fits your lifestyle
            </div>

            <form
              action="/properties"
              method="GET"
              className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[1.25fr_1fr_0.8fr_0.8fr_auto]"
            >
              {/* Location */}
              <div className="relative">
                <MapPin
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-blue-300"
                />

                <input
                  type="text"
                  name="location"
                  aria-label="Search location"
                  placeholder="Search location"
                  className={`${fieldClass} pl-11`}
                />
              </div>

              {/* Property Type */}
              <div className="relative">
                <Building2
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-blue-300"
                />

                <select
                  name="propertyType"
                  aria-label="Property type"
                  defaultValue=""
                  className={`${fieldClass} cursor-pointer appearance-none pl-11 pr-10`}
                >
                  <option value="" className="text-slate-900">
                    Property Type
                  </option>

                  <option value="Apartment" className="text-slate-900">
                    Apartment
                  </option>

                  <option value="House" className="text-slate-900">
                    House
                  </option>

                  <option value="Studio" className="text-slate-900">
                    Studio
                  </option>

                  <option value="Villa" className="text-slate-900">
                    Villa
                  </option>

                  <option value="Office" className="text-slate-900">
                    Office
                  </option>
                </select>

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-white/60">
                  ▼
                </span>
              </div>

              {/* Minimum Price */}
              <input
                type="number"
                name="minPrice"
                aria-label="Minimum price"
                placeholder="Min price"
                className={fieldClass}
              />

              {/* Maximum Price */}
              <input
                type="number"
                name="maxPrice"
                aria-label="Maximum price"
                placeholder="Max price"
                className={fieldClass}
              />

              {/* Search Button */}
              <button
                type="submit"
                className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-6 font-semibold text-white shadow-[0_14px_35px_rgba(37,99,235,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(37,99,235,0.45)] focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/30 active:translate-y-0 xl:w-auto"
              >
                <Search
                  size={19}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span className="whitespace-nowrap">Search Properties</span>
              </button>
            </form>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-slate-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Verified properties
            </span>

            <span className="hidden h-4 w-px bg-white/20 sm:block" />

            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.7)]" />
              Trusted owners
            </span>

            <span className="hidden h-4 w-px bg-white/20 sm:block" />

            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
              Secure booking
            </span>
          </motion.div>

          {/* Slider Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8 flex items-center justify-center"
          >
            <div className="flex items-center gap-3 rounded-full border border-white/20 bg-slate-950/35 p-1.5 shadow-lg backdrop-blur-xl">
              <button
                type="button"
                onClick={showPreviousSlide}
                aria-label="Show previous banner image"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-2 px-1">
                {bannerSlides.map((slide, index) => (
                  <button
                    key={slide.image}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Show banner image ${index + 1}`}
                    aria-current={currentSlide === index ? "true" : undefined}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      currentSlide === index
                        ? "w-8 bg-gradient-to-r from-blue-400 to-cyan-300"
                        : "w-2 bg-white/35 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={showNextSlide}
                aria-label="Show next banner image"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/60 to-transparent" />
    </section>
  );
}
