import PropertyDetails from "@/components/PropertyDetails";

export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;
  console.log(id);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/property/${id}`,
  );

  const property = await res.json();

  return <PropertyDetails property={property} />;
}
