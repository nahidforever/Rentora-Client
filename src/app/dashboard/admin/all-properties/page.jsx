import AdminPropertiesTable from "@/components/dashboard/AdminPropertiesTable";
import { getTokenServer } from "@/lib/getTokenServer";


export default async function AllPropertiesPage() {
  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/properties`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const properties = await res.json();

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          All Properties
        </h1>

        <p className="text-gray-500 mt-1">
          Review and manage all submitted properties across the platform.
        </p>
      </div>

      <AdminPropertiesTable properties={properties} />
    </section>
  );
}