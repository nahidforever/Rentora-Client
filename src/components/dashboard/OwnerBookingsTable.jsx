import Image from "next/image";
import ApproveBookingButton from "./ApproveBookingButton";
import RejectBookingButton from "./RejectBookingButton";

export default function OwnerBookingsTable({ bookings }) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-x-auto">
      <table className="w-full min-w-[1100px] text-sm">
        <thead className="bg-gray-50 border-b text-gray-600">
          <tr>
            <th className="p-4 text-left font-semibold">Tenant</th>
            <th className="text-left font-semibold">Property</th>
            <th className="text-left font-semibold">Amount</th>
            <th className="text-left font-semibold">Booking Status</th>
            <th className="text-left font-semibold">Payment Status</th>
            <th className="text-right p-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings?.map((booking) => (
            <tr
              key={booking._id}
              className="border-b hover:bg-gray-50 transition"
            >
              {/* Tenant */}
              <td className="p-4">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {booking.tenantName}
                  </h3>

                  <p className="text-xs text-gray-500">{booking.tenantEmail}</p>
                </div>
              </td>

              {/* Property */}
              <td>
                <div className="flex items-center gap-3">
                  <Image
                    src={booking.propertyImage}
                    alt={booking.propertyTitle}
                    width={55}
                    height={55}
                    className="rounded-xl object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {booking.propertyTitle}
                    </h3>

                    <p className="text-xs text-gray-500">{booking.location}</p>
                  </div>
                </div>
              </td>

              {/* Amount */}
              <td>
                <span className="font-semibold text-gray-800">
                  ৳ {booking.rent?.toLocaleString()}
                </span>
              </td>

              {/* Booking Status */}
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
            ${
              booking.bookingStatus === "Approved"
                ? "bg-green-100 text-green-700"
                : booking.bookingStatus === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
            }`}
                >
                  {booking.bookingStatus}
                </span>
              </td>

              {/* Payment Status */}
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
            ${
              booking.paymentStatus === "Paid"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-gray-100 text-gray-700"
            }`}
                >
                  {booking.paymentStatus}
                </span>
              </td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex justify-end gap-2">
                  <ApproveBookingButton booking={booking} />

                  <RejectBookingButton booking={booking} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
