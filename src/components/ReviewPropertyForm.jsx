"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ReviewPropertyForm({ property }) {
  const { data: session } = authClient.useSession();

  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleReview = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const form = new FormData(e.target);

      const reviewData = {
        propertyId: property._id,
        propertyTitle: property.title,

        tenantId: session.user.id,
        tenantName: session.user.name,
        tenantEmail: session.user.email,

        rating,

        comment: form.get("comment"),
      };

      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/tenant/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(reviewData),
        },
      );

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Review submitted");

        e.target.reset();

        setRating(5);

        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to submit review");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white border rounded-3xl p-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Leave a Review</h2>

      <form onSubmit={handleReview} className="space-y-5">
        {/* Rating */}
        <div>
          <label className="font-medium mb-2 block">Rating</label>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="5">⭐⭐⭐⭐⭐ (5)</option>
            <option value="4">⭐⭐⭐⭐ (4)</option>
            <option value="3">⭐⭐⭐ (3)</option>
            <option value="2">⭐⭐ (2)</option>
            <option value="1">⭐ (1)</option>
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="font-medium mb-2 block">Comment</label>

          <textarea
            required
            rows={5}
            name="comment"
            placeholder="Write your experience..."
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
