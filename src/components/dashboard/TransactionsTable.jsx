export default function TransactionsTable({ transactions }) {
  return (
    <div className="bg-white rounded-3xl shadow border overflow-x-auto">
      <table className="w-full min-w-[1100px] text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-left">Transaction ID</th>
            <th className="text-left">Property</th>
            <th className="text-left">Tenant</th>
            <th className="text-left">Owner</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions?.map((transaction) => (
            <tr
              key={transaction._id}
              className="border-b hover:bg-gray-50 transition"
            >
              {/* Transaction ID */}
              <td className="p-4">
                <p className="font-medium text-gray-800">
                  {transaction.transactionId}
                </p>
              </td>

              {/* Property */}
              <td>
                <p className="font-semibold">{transaction.propertyTitle}</p>
              </td>

              {/* Tenant */}
              <td>
                <div>
                  <p className="font-medium">{transaction.tenantName}</p>

                  <p className="text-xs text-gray-500">
                    {transaction.tenantEmail}
                  </p>
                </div>
              </td>

              {/* Owner */}
              <td>
                <p className="font-medium">{transaction.ownerName}</p>
              </td>

              {/* Amount */}
              <td>
                <span className="font-bold text-green-600">
                  ৳ {transaction.amount?.toLocaleString()}
                </span>
              </td>

              {/* Date */}
              <td>
                {new Date(transaction.createdAt).toLocaleDateString("en-GB")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
