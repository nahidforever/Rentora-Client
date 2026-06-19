"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ChangeRoleClient({ user }) {
  const router = useRouter();

  const [role, setRole] = useState(user.role || "tenant");
  const [loading, setLoading] = useState(false);

  const updateRole = async () => {
    setLoading(true);

    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/user/${user._id}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({ role }),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Role updated");
        router.refresh();
      } else {
        toast.error("No changes detected");
      }
    } catch (err) {
      toast.error("Failed to update role");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-end gap-2">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="tenant">Tenant</option>
        <option value="owner">Owner</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={updateRole}
        disabled={loading}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
