import AdminBookingsTable from "@/components/dashboard/AdminBookingsTable";
import { getTokenServer } from "@/lib/getTokenServer";

export default async function AdminBookingsPage() {
  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/bookings`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const bookings = await res.json();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">All Bookings</h1>

        <p className="text-gray-500 mt-2">Monitor all booking activities.</p>
      </div>

      <AdminBookingsTable bookings={bookings} />
    </div>
  );
}
