import { getTokenServer } from "@/lib/getTokenServer";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default async function SuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  if (session.status === "open") {
    redirect("/");
  }

  if (session.status === "complete") {
    const metadata = session.metadata;

    const token = await getTokenServer();

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        transactionId: session.payment_intent.id,

        amount: metadata.rent,

        propertyId: metadata.propertyId,
        propertyTitle: metadata.propertyTitle,
        propertyImage: metadata.propertyImage,
        location: metadata.location,

        ownerId: metadata.ownerId,
        ownerName: metadata.ownerName,
        ownerEmail: metadata.ownerEmail,

        tenantId: metadata.tenantId,
        tenantName: metadata.tenantName,
        tenantEmail: metadata.tenantEmail,

        moveInDate: metadata.moveInDate,
        contactNumber: metadata.contactNumber,
        additionalNotes: metadata.additionalNotes,
      }),
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg">
        <h1 className="text-4xl font-bold text-green-600 mb-5">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600">
          Your booking has been created successfully.
        </p>
      </div>
    </div>
  );
}
