"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { addProperty } from "@/lib/action/property";
import { imageUpload } from "@/lib/imgUpload";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
} from "@heroui/react";
import toast from "react-hot-toast";

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

export default function AddPropertyPage() {
  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleAmenityChange = (value) => {
    if (selectedAmenities.includes(value)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== value));
    } else {
      setSelectedAmenities([...selectedAmenities, value]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target);

      const imageFile = formData.get("image");
      const imageRes = await imageUpload(imageFile);

      const property = {
        title: formData.get("title"),
        location: formData.get("location"),
        description: formData.get("description"),

        propertyType: formData.get("propertyType"),
        rentType: formData.get("rentType"),

        rent: Number(formData.get("rent")),
        bedrooms: Number(formData.get("bedrooms")),
        bathrooms: Number(formData.get("bathrooms")),
        size: Number(formData.get("size")),

        amenities: selectedAmenities,
        image: imageRes.url,

        extraFeatures: formData.get("extraFeatures")
          ? formData
              .get("extraFeatures")
              .split(",")
              .map((i) => i.trim())
          : [],

        ownerId: session?.user?.id,
        ownerName: session?.user?.name,
        ownerEmail: session?.user?.email,

        status: "Pending",
      };

      const result = await addProperty(property);

      if (result?.insertedId || result?.acknowledged) {
        toast.success("Property added successfully");
        e.target.reset();
        setSelectedAmenities([]);
      } else {
        toast.error("Failed to add property");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <p className="text-blue-600 tracking-[4px] text-xs uppercase font-semibold">
            Rentora Owner Panel
          </p>

          <h1 className="text-4xl font-bold text-gray-800">Add New Property</h1>

          <p className="text-gray-500 text-sm">
            Fill all details carefully before publishing your property
          </p>
        </div>

        {/* FORM */}
        <Card className="p-8 rounded-2xl shadow-lg border bg-white">
          <Form
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <TextField name="title" isRequired>
              <Label>Property Title</Label>
              <Input placeholder="Luxury Apartment in Dhaka" />
            </TextField>

            <TextField name="location" isRequired>
              <Label>Location</Label>
              <Input placeholder="Dhanmondi, Dhaka" />
            </TextField>

            <Select name="propertyType">
              <Label>Property Type</Label>
              <Select.Trigger className="w-full border px-3 py-2 rounded-lg">
                <Select.Value placeholder="Select type" />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {propertyTypes.map((t) => (
                    <ListBox.Item key={t} id={t}>
                      {t}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <Select name="rentType">
              <Label>Rent Type</Label>
              <Select.Trigger className="w-full border px-3 py-2 rounded-lg">
                <Select.Value placeholder="Select rent type" />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  {rentTypes.map((t) => (
                    <ListBox.Item key={t} id={t}>
                      {t}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <TextField name="rent">
              <Label>Rent</Label>
              <Input type="number" placeholder="25000" />
            </TextField>

            <TextField name="bedrooms">
              <Label>Bedrooms</Label>
              <Input type="number" />
            </TextField>

            <TextField name="bathrooms">
              <Label>Bathrooms</Label>
              <Input type="number" />
            </TextField>

            <TextField name="size">
              <Label>Size (sqft)</Label>
              <Input type="number" />
            </TextField>

            {/* IMAGE */}
            <div className="md:col-span-2">
              <Label>Image</Label>
              <input
                name="image"
                type="file"
                className="w-full border p-2 rounded-lg"
              />
            </div>

            {/* AMENITIES (CHECKBOX) */}
            <div className="md:col-span-2">
              <Label className="font-medium">Amenities</Label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {amenitiesList.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg cursor-pointer"
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
            <TextField name="extraFeatures" className="md:col-span-2">
              <Label>Extra Features (comma separated)</Label>
              <Input placeholder="Balcony, Garden, Furnished" />
            </TextField>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <Label>Description</Label>
              <textarea
                name="description"
                className="w-full border rounded-lg p-3 min-h-[120px]"
              />
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
              >
                {loading ? "Submitting..." : "Add Property"}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </section>
  );
}
