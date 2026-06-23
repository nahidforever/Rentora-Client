import { Users, Building2, CalendarCheck, CreditCard } from "lucide-react";

export default function AdminOverviewCards({ overview }) {
  const cards = [
    {
      title: "Users",
      value: overview?.totalUsers || 0,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Properties",
      value: overview?.totalProperties || 0,
      icon: Building2,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Bookings",
      value: overview?.totalBookings || 0,
      icon: CalendarCheck,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Transactions",
      value: overview?.totalTransactions || 0,
      icon: CreditCard,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white border rounded-3xl shadow-sm p-7 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
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
