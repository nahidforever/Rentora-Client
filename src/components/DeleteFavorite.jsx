"use client";

import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteFavorite({ favorite }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tenant/favorite/${favorite._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Removed from favorites");
        router.refresh();
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <Button variant="outline" className="text-red-500">
        <TrashBin />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />

              <AlertDialog.Heading>Remove From Favorites?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                Remove <strong>{favorite.title}</strong> from your favorites?
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button slot="close" variant="danger" onClick={handleDelete}>
                Remove
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
