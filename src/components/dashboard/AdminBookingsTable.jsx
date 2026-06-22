import Image from "next/image";

export default function AdminBookingsTable({ bookings }) {
  return (
    <div className="bg-white rounded-3xl border shadow overflow-x-auto">
      <table className="w-full min-w-[1200px] text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-5 text-left">Tenant</th>
            <th className="text-left">Owner</th>
            <th className="text-left">Property</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Move In Date</th>
            <th className="text-left">Booking Status</th>
            <th className="text-left">Payment Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings?.map((booking) => (
            <tr
              key={booking._id}
              className="border-b hover:bg-gray-50 transition"
            >
              {/* Tenant */}
              <td className="p-5">
                <h3 className="font-semibold text-gray-800">
                  {booking.tenantName}
                </h3>

                <p className="text-xs text-gray-500">{booking.tenantEmail}</p>
              </td>

              {/* Owner */}
              <td>
                <h3 className="font-semibold text-gray-800">
                  {booking.ownerName}
                </h3>

                <p className="text-xs text-gray-500">{booking.ownerEmail}</p>
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
                    <h3 className="font-semibold">{booking.propertyTitle}</h3>

                    <p className="text-xs text-gray-500">{booking.location}</p>
                  </div>
                </div>
              </td>

              {/* Amount */}
              <td className="font-semibold text-gray-800">
                ৳ {booking.rent?.toLocaleString()}
              </td>

              {/* Move In Date */}
              <td>{new Date(booking.moveInDate).toLocaleDateString()}</td>

              {/* Booking Status */}
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
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
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    booking.paymentStatus === "Paid"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {booking.paymentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
