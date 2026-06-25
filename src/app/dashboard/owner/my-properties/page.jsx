import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getOwnerProperties } from "@/lib/api/property";
import MyPropertiesTable from "@/components/dashboard/MyPropertiesTable";
import { getTokenServer } from "@/lib/getTokenServer";
import Link from "next/link";
import { HiHomeModern } from "react-icons/hi2";

export default async function MyPropertiesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const ownerId = session?.user?.id;
  const token = await getTokenServer();

  const properties = await getOwnerProperties(ownerId, token);

  return (
    <section className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Properties</h1>

        <p className="text-sm text-gray-500">
          Manage all your listed properties in one place
        </p>
      </div>

      {properties.length === 0 ? (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-6xl text-blue-600 mb-4 flex justify-center">
              <HiHomeModern />
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Properties Yet
            </h2>

            <p className="mt-3 text-gray-500">
              You haven not listed any properties yet. Add your first property
              and start receiving bookings.
            </p>

            <Link
              href="/dashboard/owner/add-property"
              className="inline-flex mt-6 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Add Property
            </Link>
          </div>
        </div>
      ) : (
        <MyPropertiesTable properties={properties} />
      )}
    </section>
  );
}
