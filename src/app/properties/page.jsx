import PropertiesFilter from "@/components/PropertiesFilter";
import PropertyCard from "@/components/PropertyCard";
import { FcHome } from "react-icons/fc";

export default async function PropertiesPage({ searchParams }) {
  const params = await searchParams;

  const search = params.search || "";
  const propertyType = params.propertyType || "";
  const sort = params.sort || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/properties?search=${search}&propertyType=${propertyType}&sort=${sort}`,
  );

  const properties = await res.json();

  return (
    <section className="max-w-7xl mx-auto py-10 px-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-sm font-semibold uppercase tracking-[3px] text-blue-600">
          Find Your Perfect Home
        </span>

        <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
          Explore Available Properties
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto">
          Browse verified rental properties and discover the perfect place that
          matches your lifestyle and budget.
        </p>
      </div>

      {/* Search Filter */}
      <PropertiesFilter
        search={search}
        propertyType={propertyType}
        sort={sort}
      />

      {/* Cards */}
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-3xl p-12 text-center">
          <div className="flex justify-center text-5xl mb-4">
            <FcHome />
          </div>

          <h3 className="text-xl font-semibold text-gray-800">
            No Properties Found
          </h3>

          <p className="text-gray-500 mt-2">
            We could not find any properties matching your search criteria.
          </p>
        </div>
      )}
    </section>
  );
}
