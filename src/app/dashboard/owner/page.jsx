import MonthlyEarningsChart from "@/components/dashboard/MonthlyEarningsChart";
import OwnerAnalyticsCards from "@/components/dashboard/OwnerAnalyticsCards";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function OwnerDashboardHome() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/owner/analytics`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const chartRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/owner/monthly-earnings`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const analytics = await res.json();
  const chartDataResponse = await chartRes.json();

  const chartData = Array.isArray(chartDataResponse) ? chartDataResponse : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>

        <p className="text-gray-500 mt-1">
          Overview of your properties and earnings.
        </p>
      </div>

      <OwnerAnalyticsCards analytics={analytics} />

      <MonthlyEarningsChart chartData={chartData} />
    </div>
  );
}
