"use client";

import { Search, RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PropertiesFilter({ search, propertyType, sort }) {
  const router = useRouter();
  const params = useSearchParams();

  const handleChange = (name, value) => {
    const query = new URLSearchParams(params.toString());

    if (value) {
      query.set(name, value);
    } else {
      query.delete(name);
    }

    router.push(`/properties?${query.toString()}`);
  };

  const handleReset = () => {
    router.push("/properties");
  };

  return (
    <div className="bg-white border rounded-3xl shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Search */}
          <div className="lg:col-span-5 relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search || ""}
              placeholder="Search by location..."
              onChange={(e) => handleChange("search", e.target.value)}
              className="w-full h-12 pl-11 pr-4 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Property Type */}
          <div className="lg:col-span-3">
            <select
              value={propertyType}
              onChange={(e) => handleChange("propertyType", e.target.value)}
              className="w-full h-12 border rounded-2xl px-4 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Property Types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Studio">Studio</option>
              <option value="Villa">Villa</option>
              <option value="Office">Office</option>
            </select>
          </div>

          {/* Sort */}
          <div className="lg:col-span-3">
            <select
              value={sort}
              onChange={(e) => handleChange("sort", e.target.value)}
              className="w-full h-12 border rounded-2xl px-4 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sort By Price</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* Reset */}
          <div className="lg:col-span-1">
            <button
              onClick={handleReset}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-2xl bg-gray-100 hover:bg-gray-200 transition"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {(search || propertyType || sort) && (
          <div className="flex flex-wrap gap-2 mt-5">
            {search && (
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                {search}
              </span>
            )}

            {propertyType && (
              <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                {propertyType}
              </span>
            )}

            {sort && (
              <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium">
                {sort === "low" ? "Low → High" : "High → Low"}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
