import { CircleDollarSign, Building2, BookOpenCheck } from "lucide-react";

export default function OwnerAnalyticsCards({ analytics }) {
  const {
    totalEarnings = 0,
    totalProperties = 0,
    totalBookings = 0,
  } = analytics;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {/* Total Earnings */}
      <div className="bg-white rounded-3xl border shadow-sm p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Earnings</p>

            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              ৳ {totalEarnings.toLocaleString()}
            </h2>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
            <CircleDollarSign className="text-green-600" size={28} />
          </div>
        </div>
      </div>

      {/* Total Properties */}
      <div className="bg-white rounded-3xl border shadow-sm p-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Properties</p>

            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              {totalProperties}
            </h2>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
            <Building2 className="text-blue-600" size={28} />
          </div>
        </div>
      </div>

      {/* Total Bookings */}
      <div className="bg-white rounded-3xl border shadow-sm p-7 md:col-span-2 xl:col-span-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Bookings</p>

            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              {totalBookings}
            </h2>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
            <BookOpenCheck className="text-purple-600" size={28} />
          </div>
        </div>
      </div>
    </div>
  );
}
