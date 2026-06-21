"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Heart, Eye } from "lucide-react";
import DeleteFavorite from "./DeleteFavorite";

export default function MyFavoritesTable({ favorites }) {
  if (!favorites?.length) {
    return (
      <div className="bg-white rounded-3xl border shadow-sm p-16 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center">
          <Heart className="w-10 h-10 text-red-500" />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-gray-800">
          No Favorite Properties
        </h2>

        <p className="mt-2 text-gray-500">
          Start saving properties to access them quickly later.
        </p>

        <Link
          href="/properties"
          className="inline-flex items-center mt-6 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Browse Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div>
          <h2 className="text-xl font-bold text-gray-800">My Favorites</h2>

          <p className="text-sm text-gray-500">
            {favorites.length} saved properties
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm">
              <th className="px-6 py-4 text-left font-semibold">Property</th>

              <th className="px-4 py-4 text-left font-semibold">Location</th>

              <th className="px-4 py-4 text-left font-semibold">
                Monthly Rent
              </th>

              <th className="px-4 py-4 text-left font-semibold">Owner</th>

              <th className="px-6 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody>
            {favorites.map((item) => (
              <tr
                key={item._id}
                className="border-t hover:bg-blue-50/40 transition-all"
              >
                {/* Property */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-28 overflow-hidden rounded-2xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover hover:scale-105 transition duration-300"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Added to favorites
                      </p>
                    </div>
                  </div>
                </td>

                {/* Location */}
                <td className="px-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    {item.location}
                  </div>
                </td>

                {/* Rent */}
                <td className="px-4">
                  <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-sm font-semibold">
                    ৳ {item.rent?.toLocaleString()}
                  </span>
                </td>

                {/* Owner */}
                <td className="px-4">
                  <span className="font-medium text-gray-700">
                    {item.ownerName}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/properties/${item.propertyId}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      <Eye size={16} />
                      View
                    </Link>

                    <DeleteFavorite favorite={item} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
