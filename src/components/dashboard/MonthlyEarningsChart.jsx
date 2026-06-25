"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function MonthlyEarningsChart({ chartData }) {
  if (!chartData.length) {
    return (
      <div className="bg-white rounded-3xl border shadow-sm p-8 text-center">
        <h2 className="text-xl font-semibold">No earnings data available</h2>

        <p className="text-gray-500 mt-2">
          Earnings statistics will appear here once payments are received.
        </p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Monthly Earnings</h2>

        <p className="text-gray-500 mt-1 text-sm">
          Overview of your income for the past months
        </p>
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            {/* Gradient */}
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#e5e7eb"
            />

            {/* X Axis */}
            <XAxis
              dataKey="month"
              tick={{ fontSize: 13 }}
              tickLine={false}
              axisLine={false}
            />

            {/* Y Axis */}
            <YAxis tick={{ fontSize: 13 }} tickLine={false} axisLine={false} />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
              formatter={(value) => [
                `৳ ${Number(value).toLocaleString()}`,
                "Earnings",
              ]}
            />

            {/* Legend */}
            <Legend />

            {/* Bar */}
            <Bar
              dataKey="earnings"
              fill="url(#earningsGradient)"
              radius={[12, 12, 0, 0]}
              maxBarSize={45}
              name="Monthly Earnings"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
