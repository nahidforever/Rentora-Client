"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { XCircle } from "lucide-react";

export default function RejectBookingButton({ booking }) {
  const router = useRouter();

  const handleReject = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/owner/booking/${booking._id}/reject`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Booking rejected");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={handleReject}
      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
    >
      <XCircle size={18} />
    </button>
  );
}
