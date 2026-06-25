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

  // 403 Check
  if (res.status === 403) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-red-500">403</h1>

          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            Access Denied
          </h2>

          <p className="mt-3 text-gray-500">
            Only Tenants can access this property details page.
          </p>
        </div>
      </div>
    );
  }

  const property = await res.json();

  const reviewRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const reviews = await reviewRes.json();

  return <PropertyDetails property={property} reviews={reviews} />;
}
