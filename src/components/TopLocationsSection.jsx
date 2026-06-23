"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const locations = [
  {
    name: "Gulshan",
    properties: "120+ Properties",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
  },

  {
    name: "Dhanmondi",
    properties: "95+ Properties",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200",
  },

  {
    name: "Uttara",
    properties: "80+ Properties",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200",
  },

  {
    name: "Cox's Bazar",
    properties: "65+ Properties",
    image:
      "https://images.unsplash.com/photo-1626239889138-a7e4f971059e?q=80&w=1074",
  },
];
export default function TopLocationsSection() {
  return (
    <section className=" bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Top Locations
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Discover popular locations with premium rental properties.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{
                once: true,
              }}
              className="group overflow-hidden rounded-3xl shadow-lg relative"
            >
              <div className="relative h-80">
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold">{location.name}</h3>

                  <p className="text-sm text-gray-200 mt-1">
                    {location.properties}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
