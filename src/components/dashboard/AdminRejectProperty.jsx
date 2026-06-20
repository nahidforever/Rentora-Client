"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { XCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminRejectProperty({ property }) {
  const router = useRouter();

  const [feedback, setFeedback] = useState("");

  const handleReject = async () => {
    if (!feedback.trim()) {
      return toast.error("Please provide rejection feedback");
    }

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/property/${property._id}/reject`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({
            feedback,
          }),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Property rejected");
        router.refresh();
      } else {
        toast.error("No changes detected");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="outline"
        className="text-red-600"
        disabled={property.status === "Rejected"}
      >
        <XCircle size={18} />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[500px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Reject Property?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body className="space-y-4">
              <p className="text-sm text-gray-500">
                Provide a reason why this property is being rejected.
              </p>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write rejection feedback..."
                className="w-full border rounded-xl p-3 min-h-[120px]"
              />
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button slot="close" variant="danger" onClick={handleReject}>
                Reject Property
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
