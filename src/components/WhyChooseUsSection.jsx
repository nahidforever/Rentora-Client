"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Building2, CreditCard, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    description:
      "Every property is carefully reviewed and approved before listing.",
  },

  {
    icon: Building2,
    title: "Trusted Owners",
    description:
      "Connect directly with verified owners and avoid unnecessary hassle.",
  },

  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Book properties with confidence using our secure payment system.",
  },

  {
    icon: BadgeCheck,
    title: "Easy Booking",
    description:
      "Simple and seamless booking experience from anywhere, anytime.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose Rentora?
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto leading-7">
            Experience a smarter and more reliable way to discover, book and
            manage rental properties.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
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
                className="bg-white rounded-3xl p-8 border shadow-sm hover:shadow-xl transition text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                  <Icon size={30} className="text-blue-600" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-500 leading-7">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
