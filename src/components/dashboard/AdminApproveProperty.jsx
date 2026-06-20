"use client";

import { authClient } from "@/lib/auth-client";
import { CheckCircle } from "lucide-react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminApproveProperty({ property }) {
  const router = useRouter();

  const handleApprove = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/property/${property._id}/approve`,
        {
          method: "PATCH",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Property approved successfully");
        router.refresh();
      } else {
        toast.error("No changes detected");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Button
      onClick={handleApprove}
      variant="outline"
      className="text-green-600"
      disabled={property.status === "Approved"}
    >
      <CheckCircle size={18} />
    </Button>
  );
}
