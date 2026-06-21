import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const user = userSession?.user;

    const formData = await request.formData();

    const propertyId = formData.get("propertyId");
    const propertyTitle = formData.get("propertyTitle");
    const propertyImage = formData.get("propertyImage");
    const location = formData.get("location");
    const rent = formData.get("rent");

    const ownerId = formData.get("ownerId");
    const ownerName = formData.get("ownerName");
    const ownerEmail = formData.get("ownerEmail");

    const moveInDate = formData.get("moveInDate");
    const contactNumber = formData.get("contactNumber");
    const additionalNotes = formData.get("additionalNotes");

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,

      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(rent) * 100,

            product_data: {
              name: propertyTitle,
            },
          },

          quantity: 1,
        },
      ],

      mode: "payment",

      metadata: {
        // property
        propertyId,
        propertyTitle,
        propertyImage,
        location,
        rent,

        // owner
        ownerId,
        ownerName,
        ownerEmail,

        // tenant
        tenantId: user.id,
        tenantName: user.name,
        tenantEmail: user.email,

        // booking info
        moveInDate,
        contactNumber,
        additionalNotes,
      },

      success_url: `${origin}/properties/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/properties/${propertyId}`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: err.statusCode || 500,
      },
    );
  }
}
