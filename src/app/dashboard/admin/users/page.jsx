import ChangeRoleClient from "@/components/dashboard/ChangeRoleClient";
import { getTokenServer } from "@/lib/getTokenServer";

async function getUsers(token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return res.json();
}

export default async function UsersPage() {
  const token = await getTokenServer();

  const users = await getUsers(token);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      <div className="overflow-x-auto bg-white border rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-right p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-600">
                    {user.role || "tenant"}
                  </span>
                </td>

                <td className="text-right p-3">
                  <ChangeRoleClient user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
