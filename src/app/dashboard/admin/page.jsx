import AdminOverviewCards from "@/components/dashboard/AdminOverviewCards";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AdminDashboardHome() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/overview`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const overview = await res.json();

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome Admin Dashboard!
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor users, properties, bookings and transactions across the
          platform.
        </p>
      </div>

      <AdminOverviewCards overview={overview} />
    </div>
  );
}
