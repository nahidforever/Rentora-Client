import { Star } from "lucide-react";

export default function ReviewSection({ reviews }) {
  return (
    <div className="bg-white border rounded-3xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">
        Customer Reviews ({reviews?.length})
      </h2>

      <div className="space-y-6">
        {reviews?.map((review) => (
          <div key={review._id} className="border rounded-2xl p-6">
            {/* Top */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{review.tenantName}</h3>

                <p className="text-sm text-gray-500">{review.tenantEmail}</p>
              </div>

              <div className="flex items-center gap-1 text-yellow-500">
                <Star size={18} fill="currentColor" />

                <span className="font-semibold">{review.rating}</span>
              </div>
            </div>

            {/* Comment */}
            <p className="mt-4 text-gray-600 leading-7">{review.comment}</p>

            {/* Date */}
            <p className="text-sm text-gray-400 mt-4">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
