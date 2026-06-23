import TenantOverviewCards from "@/components/dashboard/TenantOverviewCards";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function TenantDashboardPage() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tenant/dashboard-overview`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const overview = await res.json();

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl border shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back 👋</h1>

        <p className="mt-3 text-gray-500 leading-7 max-w-3xl">
          Manage your bookings, track your payments, and access your saved
          properties from one convenient place. Stay updated with all your
          rental activities through your personal dashboard.
        </p>
      </div>

      <TenantOverviewCards overview={overview} />
    </div>
  );
}
