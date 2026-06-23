import { CalendarCheck, Heart, CreditCard } from "lucide-react";

export default function TenantOverviewCards({ overview }) {
  const cards = [
    {
      title: "Total Bookings",
      value: overview?.totalBookings || 0,
      icon: CalendarCheck,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Favorites",
      value: overview?.totalFavorites || 0,
      icon: Heart,
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Total Paid",
      value: `৳ ${(overview?.totalPaid || 0).toLocaleString()}`,
      icon: CreditCard,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white border rounded-3xl shadow-sm p-7 hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>

                <h2 className="mt-3 text-4xl font-bold text-gray-900">
                  {card.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.color}`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
