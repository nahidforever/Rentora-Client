import MyBookingsTable from "@/components/dashboard/MyBookingsTable";
import { getTokenServer } from "@/lib/getTokenServer";

export default async function MyBookingsPage() {
  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tenant/bookings`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const bookings = await res.json();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Bookings</h1>

      <MyBookingsTable bookings={bookings} />
    </div>
  );
}
