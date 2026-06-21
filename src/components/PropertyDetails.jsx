import Image from "next/image";
import { Bath, BedDouble, MapPin, Maximize } from "lucide-react";
import AddToFavoriteButton from "./AddToFavoriteButton";
import BookPropertyModal from "./BookPropertyModal";

export default function PropertyDetails({ property }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">
          {/* IMAGE */}
          <div className="overflow-hidden rounded-3xl shadow-lg border">
            <Image
              src={property.image}
              alt={property.title}
              width={1200}
              height={800}
              priority
              className="w-full h-auto object-cover"
            />
          </div>

          {/* TITLE */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 mt-3 text-gray-500">
              <MapPin size={18} />
              <span>{property.location}</span>
            </div>
          </div>

          {/* OVERVIEW */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-2xl p-5 flex flex-col items-center bg-white shadow-sm">
              <BedDouble className="text-blue-600 mb-2" />

              <h3 className="font-semibold text-lg">{property.bedrooms}</h3>

              <p className="text-sm text-gray-500">Bedrooms</p>
            </div>

            <div className="border rounded-2xl p-5 flex flex-col items-center bg-white shadow-sm">
              <Bath className="text-blue-600 mb-2" />

              <h3 className="font-semibold text-lg">{property.bathrooms}</h3>

              <p className="text-sm text-gray-500">Bathrooms</p>
            </div>

            <div className="border rounded-2xl p-5 flex flex-col items-center bg-white shadow-sm">
              <Maximize className="text-blue-600 mb-2" />

              <h3 className="font-semibold text-lg">{property.size}</h3>

              <p className="text-sm text-gray-500">Sqft</p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white border rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-5">About this property</h2>

            <p className="text-gray-600 leading-8">{property.description}</p>
          </div>

          {/* AMENITIES */}
          <div className="bg-white border rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-5">Amenities</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {property.amenities?.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-xl px-5 py-4 text-gray-700"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>

          {/* EXTRA FEATURES */}
          <div className="bg-white border rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-5">Extra Features</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {property.extraFeatures?.map((item, index) => (
                <div
                  key={index}
                  className="border rounded-xl px-5 py-4 text-gray-700"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE CARD */}
        <div className="order-last lg:order-none">
          <div className="lg:sticky lg:top-24">
            <div className="bg-white border rounded-3xl shadow-xl p-8 space-y-7">
              {/* PRICE */}
              <div className="border-b pb-5">
                <h2 className="text-4xl font-bold text-blue-600">
                  ৳ {property.rent?.toLocaleString()}
                </h2>

                <p className="text-gray-500 mt-2">{property.rentType} Rent</p>
              </div>

              {/* INFO */}
              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between">
                  <span>Property Type</span>
                  <span className="font-medium">{property.propertyType}</span>
                </div>

                <div className="flex justify-between">
                  <span>Owner</span>
                  <span className="font-medium">{property.ownerName}</span>
                </div>

                <div className="flex justify-between">
                  <span>Email</span>
                  <span className="font-medium text-right">
                    {property.ownerEmail}
                  </span>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="space-y-4">
                <AddToFavoriteButton property={property} />

                <BookPropertyModal property={property} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
