"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AddToFavoriteButton({ property }) {
  const { data: session } = authClient.useSession();
  
  const handleFavorite = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const favoriteData = {
        propertyId: property._id,

        tenantId: session.user.id,
        tenantName: session.user.name,
        tenantEmail: session.user.email,

        title: property.title,
        image: property.image,
        location: property.location,
        rent: property.rent,
        ownerName: property.ownerName,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tenant/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(favoriteData),
        },
      );

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Added to favorites");
      } else {
        toast.error(data.message || "Already added");
      }
    } catch (error) {
      toast.error("Failed to add favorite");
    }
  };

  return (
    <button
      onClick={handleFavorite}
      className="w-full border-2 border-red-200 bg-red-50 text-red-600 py-3 rounded-2xl font-semibold hover:bg-red-100 transition"
    >
      ❤️ Add To Favorites
    </button>
  );
}
