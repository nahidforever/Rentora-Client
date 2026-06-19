import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getOwnerProperties } from "@/lib/api/property";
import MyPropertiesTable from "@/components/dashboard/MyPropertiesTable";
import { getTokenServer } from "@/lib/getTokenServer";

export default async function MyPropertiesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const ownerId = session?.user?.id;
  const token = await getTokenServer();

  const properties = await getOwnerProperties(ownerId, token);

  return (
    <section className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">My Properties</h1>
        <p className="text-sm text-gray-500">
          Manage all your listed properties in one place
        </p>
      </div>

      <MyPropertiesTable properties={properties} />
    </section>
  );
}
