"use client";

import { useState } from "react";
import Image from "next/image";
import PropertyEditModal from "./PropertyEditModal";

export default function MyPropertiesTable({ properties }) {
  const [data, setData] = useState(properties);

  const handlePropertyUpdate = (updatedProperty) => {
    setData((prev) =>
      prev.map((item) =>
        item._id === updatedProperty._id ? updatedProperty : item,
      ),
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">
      <table className="w-full min-w-[950px] text-sm">
        <thead className="bg-gray-50 border-b text-gray-600">
          <tr>
            <th className="p-4 text-left font-semibold">Property</th>
            <th className="text-left font-semibold">Location</th>
            <th className="text-left font-semibold">Rent</th>
            <th className="text-left font-semibold">Type</th>
            <th className="text-left font-semibold">Status</th>
            <th className="text-right p-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50 transition">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Image
                    key={item.image}
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                    className="rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-500">{item.propertyType}</p>
                  </div>
                </div>
              </td>

              <td className="text-gray-600">{item.location}</td>

              <td className="font-semibold text-gray-800">৳ {item.rent}</td>

              <td>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                  {item.rentType}
                </span>
              </td>

              <td>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium
                    ${
                      item.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {item.status}
                </span>
              </td>

              <td className="text-right p-4">
                <div className="flex justify-end gap-2">
                  <PropertyEditModal
                    property={item}
                    onUpdate={handlePropertyUpdate}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
