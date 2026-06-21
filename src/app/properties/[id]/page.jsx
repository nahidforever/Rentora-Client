import PropertyDetails from "@/components/PropertyDetails";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/property/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const property = await res.json();

  return <PropertyDetails property={property} />;
}
