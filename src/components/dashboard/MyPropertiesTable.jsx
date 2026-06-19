"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

export default function MyPropertiesTable({ properties }) {
  const [data] = useState(properties);

  return (
    <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">
      {/* TABLE WRAPPER */}
      <table className="w-full min-w-[950px] text-sm">
        {/* HEADER */}
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

        {/* BODY */}
        <tbody>
          {data?.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50 transition">
              {/* PROPERTY */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Image
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

              {/* LOCATION */}
              <td className="text-gray-600">{item.location}</td>

              {/* RENT */}
              <td className="font-semibold text-gray-800">৳ {item.rent}</td>

              {/* TYPE */}
              <td>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                  {item.rentType}
                </span>
              </td>

              {/* STATUS */}
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

              {/* ACTIONS */}
              <td className="text-right p-4">
                <div className="flex justify-end gap-2">
                  {/* EDIT */}
                  <button
                    onClick={() => toast.success("Edit coming soon")}
                    className="p-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50 transition"
                  >
                    <FiEdit3 size={16} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => toast.error("Delete coming soon")}
                    className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                  >
                    <MdDeleteOutline size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
