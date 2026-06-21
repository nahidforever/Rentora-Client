import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath } from "lucide-react";

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <div className="relative h-60">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800">{property.title}</h2>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin size={16} />
          {property.location}
        </div>

        {/* Beds Bath */}
        <div className="flex items-center gap-5 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <BedDouble size={16} />
            {property.bedrooms} Beds
          </div>

          <div className="flex items-center gap-1">
            <Bath size={16} />
            {property.bathrooms} Baths
          </div>
        </div>

        {/* Property Type */}
        <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs">
          {property.propertyType}
        </span>

        {/* Price */}
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-blue-600">
            ৳ {property.rent?.toLocaleString()}
          </h3>

          <p className="text-sm text-gray-500">/ {property.rentType}</p>
        </div>

        {/* Button */}
        <Link
          href={`/properties/${property._id}`}
          className="block text-center bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
