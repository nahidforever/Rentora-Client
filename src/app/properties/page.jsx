import PropertiesPagination from "@/components/PropertiesPagination";
import PropertyCard from "@/components/PropertyCard";

export default async function PropertiesPage({ searchParams }) {
  const params = await searchParams;

  const page = Number(params.page) || 1;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/properties?page=${page}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();

  return (
    <section className="max-w-7xl mx-auto py-10 px-4 space-y-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs sm:text-sm font-medium tracking-wide">
          Find Your Perfect Home
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Explore Available Properties
        </h1>

        <p className="text-sm sm:text-base text-gray-500 leading-7">
          Browse verified rental properties across different locations and
          discover the perfect place that matches your lifestyle and budget.
        </p>

        <div className="flex justify-center">
          <div className="h-1 w-20 rounded-full bg-blue-600"></div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>

      {/* Pagination */}
      <PropertiesPagination page={page} totalPages={data.totalPages} />
    </section>
  );
}
