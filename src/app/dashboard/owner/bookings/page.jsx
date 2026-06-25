import OwnerBookingsTable from "@/components/dashboard/OwnerBookingsTable";
import { getTokenServer } from "@/lib/getTokenServer";

import { HiOutlineCalendarDays } from "react-icons/hi2";

export default async function OwnerBookingsPage() {
  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/owner/bookings`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const bookings = await res.json();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Booking Requests</h1>

      {bookings.length === 0 ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="flex justify-center text-6xl text-blue-600 mb-4">
              <HiOutlineCalendarDays />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Booking Requests Yet
            </h2>

            <p className="mt-3 text-gray-500">
              You haven not received any booking requests for your properties
              yet.
            </p>
          </div>
        </div>
      ) : (
        <OwnerBookingsTable bookings={bookings} />
      )}
    </div>
  );
}
