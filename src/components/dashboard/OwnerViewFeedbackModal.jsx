"use client";

import { Button, Modal } from "@heroui/react";
import { Eye } from "lucide-react";

export default function OwnerViewFeedbackModal({ property }) {
  return (
    <Modal>
      <Button variant="light" className="text-red-600 p-0 min-w-fit">
        <Eye size={18} />
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="sm:max-w-lg w-full rounded-2xl">
            <Modal.CloseTrigger />

            <Modal.Header className="border-b">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Rejection Feedback
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Reason provided by admin for rejecting this property.
                </p>
              </div>
            </Modal.Header>

            <Modal.Body className="py-6">
              <div className="rounded-xl bg-red-50 border border-red-200 p-4">
                <p className="text-gray-700 leading-relaxed">
                  {property?.rejectionFeedback}
                </p>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" color="primary">
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
