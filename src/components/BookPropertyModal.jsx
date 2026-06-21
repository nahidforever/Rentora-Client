"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Modal } from "@heroui/react";

export default function BookPropertyModal({ property }) {
  const { data: session } = authClient.useSession();

  return (
    <Modal>
      <Button className="w-full bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700">
        Book Property
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-2xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <div>
                <h2 className="text-xl font-semibold">Book {property.title}</h2>

                <p className="text-sm text-gray-500">
                  Fill up the information below.
                </p>
              </div>
            </Modal.Header>

            <Modal.Body>
              <form action="/api/payment" method="POST" className="space-y-5">
                {/* User */}
                <div>
                  <label className="text-sm font-medium ">Tenant Name</label>

                  <input
                    value={session?.user?.name || ""}
                    readOnly
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Tenant Email</label>

                  <input
                    value={session?.user?.email || ""}
                    readOnly
                    className="w-full border rounded-xl px-4 py-3"
                  />
                </div>

                {/* Move In */}
                <div>
                  <label className="text-sm font-medium ">Move In Date</label>

                  <input
                    type="date"
                    name="moveInDate"
                    required
                    className="w-full border rounded-xl px-4 py-3 text-slate-900"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label className="text-sm font-medium">Contact Number</label>

                  <input
                    type="text"
                    name="contactNumber"
                    required
                    className="w-full border rounded-xl px-4 py-3 text-slate-900"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium">
                    Additional Notes
                  </label>

                  <textarea
                    rows={4}
                    name="additionalNotes"
                    className="w-full border rounded-xl px-4 py-3 text-slate-900"
                  />
                </div>

                {/* hidden fields */}
                <input type="hidden" name="propertyId" value={property._id} />

                <input
                  type="hidden"
                  name="propertyTitle"
                  value={property.title}
                />

                <input
                  type="hidden"
                  name="propertyImage"
                  value={property.image}
                />

                <input
                  type="hidden"
                  name="location"
                  value={property.location}
                />

                <input type="hidden" name="rent" value={property.rent} />

                <input type="hidden" name="ownerId" value={property.ownerId} />

                <input
                  type="hidden"
                  name="ownerName"
                  value={property.ownerName}
                />

                <input
                  type="hidden"
                  name="ownerEmail"
                  value={property.ownerEmail}
                />

                <Button type="submit" className="w-full bg-blue-600 text-white">
                  Confirm Booking
                </Button>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
