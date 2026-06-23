"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function CustomerReviewsSection({ reviews }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Hear from tenants who found their perfect home through Rentora.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review._id}
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
              className="bg-slate-50 rounded-3xl p-8 border hover:shadow-xl transition"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(Number(review.rating))].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-600 leading-7 mb-8">{review.comment}</p>

              {/* User */}
              <div className="border-t pt-5">
                <h3 className="font-bold text-gray-900">{review.tenantName}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
