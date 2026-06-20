"use client";

import { useState } from "react";
import { Button, Modal, Surface } from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const propertyTypes = ["Apartment", "House", "Studio", "Villa", "Office"];
const rentTypes = ["Monthly", "Weekly", "Daily"];

const amenitiesList = [
  "WiFi",
  "Parking",
  "Security",
  "Elevator",
  "Generator",
  "AC",
  "Furnished",
  "Balcony",
];

const updateProperty = async (id, data) => {
  const { data: tokenData } = await authClient.token();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/property/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(data),
    },
  );

  return await res.json();
};

export default function AdminEditPropertyModal({ property }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [selectedAmenities, setSelectedAmenities] = useState(
    Array.isArray(property?.amenities) ? property.amenities : [],
  );

  const handleAmenityChange = (value) => {
    setSelectedAmenities((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value],
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);

      const payload = {
        title: formData.get("title"),
        location: formData.get("location"),
        propertyType: formData.get("propertyType"),
        rentType: formData.get("rentType"),

        rent: Number(formData.get("rent")),
        bedrooms: Number(formData.get("bedrooms")),
        bathrooms: Number(formData.get("bathrooms")),
        size: Number(formData.get("size")),

        image: formData.get("image"),

        amenities: selectedAmenities,

        extraFeatures: formData.get("extraFeatures")
          ? formData
              .get("extraFeatures")
              .split(",")
              .map((i) => i.trim())
          : [],

        description: formData.get("description"),
      };

      const res = await updateProperty(property._id, payload);

      if (res?.modifiedCount > 0) {
        toast.success("Property updated successfully");
        router.refresh();
      } else {
        toast.error("No changes detected");
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }

    setLoading(false);
  };

  return (
    <Modal>
      {/* BUTTON */}
      <Button variant="outline">
        <BiEdit size={18} />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-5xl w-full max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl mx-auto">
            <Modal.CloseTrigger />

            {/* HEADER */}
            <Modal.Header className="border-b px-6 py-5 bg-gray-50">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Edit Property
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Update your property information and save changes to keep it
                  accurate.
                </p>
              </div>
            </Modal.Header>

            {/* BODY */}
            <Modal.Body className="p-6">
              <Surface className="p-6 rounded-xl border shadow-sm">
                <form
                  onSubmit={handleUpdate}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* TITLE */}
                  <div>
                    <label className="text-sm font-medium">
                      Property Title
                    </label>
                    <input
                      name="title"
                      defaultValue={property?.title}
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  {/* LOCATION */}
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <input
                      name="location"
                      defaultValue={property?.location}
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  {/* PROPERTY TYPE */}
                  <div>
                    <label className="text-sm font-medium">Property Type</label>
                    <select
                      name="propertyType"
                      defaultValue={property?.propertyType}
                      className="w-full border rounded-xl px-4 py-3"
                    >
                      {propertyTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* RENT TYPE */}
                  <div>
                    <label className="text-sm font-medium">Rent Type</label>
                    <select
                      name="rentType"
                      defaultValue={property?.rentType}
                      className="w-full border rounded-xl px-4 py-3"
                    >
                      {rentTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* RENT */}
                  <div>
                    <label className="text-sm font-medium">Rent (BDT)</label>
                    <input
                      type="number"
                      name="rent"
                      defaultValue={property?.rent}
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  {/* BEDROOMS */}
                  <div>
                    <label className="text-sm font-medium">Bedrooms</label>
                    <input
                      type="number"
                      name="bedrooms"
                      defaultValue={property?.bedrooms}
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  {/* BATHROOMS */}
                  <div>
                    <label className="text-sm font-medium">Bathrooms</label>
                    <input
                      type="number"
                      name="bathrooms"
                      defaultValue={property?.bathrooms}
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  {/* SIZE */}
                  <div>
                    <label className="text-sm font-medium">Size (sqft)</label>
                    <input
                      type="number"
                      name="size"
                      defaultValue={property?.size}
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  {/* IMAGE URL */}
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">
                      Image (Direct Link)
                    </label>
                    <input
                      name="image"
                      defaultValue={property?.image}
                      placeholder="https://example.com/image.jpg"
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  {/* AMENITIES */}
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Amenities</label>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                      {amenitiesList.map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-2 border rounded-xl p-3"
                        >
                          <input
                            type="checkbox"
                            checked={selectedAmenities.includes(item)}
                            onChange={() => handleAmenityChange(item)}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* EXTRA FEATURES */}
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">
                      Extra Features
                    </label>
                    <input
                      name="extraFeatures"
                      defaultValue={property?.extraFeatures?.join(", ") || ""}
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      name="description"
                      defaultValue={property?.description}
                      className="w-full border rounded-xl px-4 py-3 min-h-[140px]"
                    />
                  </div>

                  {/* BUTTON */}
                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-3 rounded-xl"
                    >
                      {loading ? "Updating..." : "Update Property"}
                    </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
