"use client";

import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";

export default function FeaturedPropertiesSection({ properties }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Featured Properties
        </h2>

        <p className="mt-4 text-gray-500 max-w-2xl mx-auto leading-7">
          Explore our handpicked premium properties from trusted owners and
          discover your next perfect home.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property, index) => (
          <motion.div
            key={property._id}
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
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
