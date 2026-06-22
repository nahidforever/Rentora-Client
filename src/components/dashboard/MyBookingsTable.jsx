import Image from "next/image";

export default function MyBookingsTable({ bookings }) {
  return (
    <div className="bg-white rounded-2xl shadow border overflow-x-auto">
      <table className="w-full min-w-[950px] text-sm">
        <thead className="bg-gray-50 border-b text-gray-600">
          <tr>
            <th className="p-4 text-left">Property Name</th>
            <th className="text-left">Booking Date</th>
            <th className="text-left">Amount Paid</th>
            <th className="text-left">Booking Status</th>
            <th className="text-left">Payment Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings?.map((booking) => (
            <tr key={booking._id} className="border-b hover:bg-gray-50">
              {/* Property */}
              <td className="p-4">
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

              {/* Booking Date */}
              <td>{new Date(booking.moveInDate).toLocaleDateString()}</td>

              {/* Amount */}
              <td className="font-semibold">
                ৳ {booking.rent?.toLocaleString()}
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
                  }
                `}
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
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                `}
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
