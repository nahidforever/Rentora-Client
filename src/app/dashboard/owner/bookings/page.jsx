import OwnerBookingsTable from "@/components/dashboard/OwnerBookingsTable";
import { getTokenServer } from "@/lib/getTokenServer";

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

      <OwnerBookingsTable bookings={bookings} />
    </div>
  );
}
