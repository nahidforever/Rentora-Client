"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CheckCircle } from "lucide-react";

export default function ApproveBookingButton({ booking }) {
  const router = useRouter();

  const handleApprove = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/owner/booking/${booking._id}/approve`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Booking approved");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={handleApprove}
      className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200"
    >
      <CheckCircle size={18} />
    </button>
  );
}
