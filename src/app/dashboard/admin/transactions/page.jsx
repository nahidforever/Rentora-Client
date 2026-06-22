import TransactionsTable from "@/components/dashboard/TransactionsTable";
import { getTokenServer } from "@/lib/getTokenServer";

export default async function AdminTransactionsPage() {
  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/transactions`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const transactions = await res.json();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Transactions</h1>

        <p className="text-gray-500 mt-2">Monitor all payment activities.</p>
      </div>

      <TransactionsTable transactions={transactions} />
    </div>
  );
}
