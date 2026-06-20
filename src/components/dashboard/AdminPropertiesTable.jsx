import Image from "next/image";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { CheckCircle, XCircle } from "lucide-react";
import AdminEditPropertyModal from "./AdminEditPropertyModal";
import AdminDeleteProperty from "./AdminDeleteProperty";

export default function AdminPropertiesTable({ properties }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border overflow-x-auto">
      <table className="w-full min-w-[1200px] text-sm">
        <thead className="bg-gray-50 border-b text-gray-600">
          <tr>
            <th className="p-4 text-left font-semibold">Property</th>
            <th className="text-left font-semibold">Owner</th>
            <th className="text-left font-semibold">Location</th>
            <th className="text-left font-semibold">Rent</th>
            <th className="text-left font-semibold">Type</th>
            <th className="text-left font-semibold">Status</th>

            <th className="text-right p-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {properties?.map((item) => (
            <tr key={item._id} className="border-b hover:bg-gray-50 transition">
              {/* Property */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={55}
                    height={55}
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

              {/* Owner */}
              <td>
                <div>
                  <p className="font-medium text-gray-800">{item.ownerName}</p>

                  <p className="text-xs text-gray-500">{item.ownerEmail}</p>
                </div>
              </td>

              {/* Location */}
              <td className="text-gray-600">{item.location}</td>

              {/* Rent */}
              <td className="font-semibold text-gray-800">
                ৳ {item.rent?.toLocaleString()}
              </td>

              {/* Rent Type */}
              <td>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600">
                  {item.rentType}
                </span>
              </td>

              {/* Status */}
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

              {/* Actions */}
              <td className="p-4">
                <div className="flex justify-end gap-2">
                  <AdminEditPropertyModal property={item} />

                  <AdminDeleteProperty property={item}></AdminDeleteProperty>

                  <button
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-200"
                    title="Update"
                  >
                    <FiEdit3 size={18} />
                  </button>

                  <button
                    className="p-2 rounded-lg bg-red-50 text-red-500 border border-red-200"
                    title="Delete"
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
