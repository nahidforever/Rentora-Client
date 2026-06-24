import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

import AdminPropertiesTable from "@/components/dashboard/AdminPropertiesTable";
import { getTokenServer } from "@/lib/getTokenServer";

export default async function AllPropertiesPage({ searchParams }) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;

  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/properties?page=${page}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">All Properties</h1>

        <p className="text-gray-500 mt-1">
          Review and manage all submitted properties across the platform.
        </p>
      </div>

      {/* Table */}
      <AdminPropertiesTable properties={data.properties} />

      {/* Pagination */}
      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Page Info */}
        <p className="text-sm text-gray-500">
          Page <span className="font-semibold text-gray-900">{page}</span> of{" "}
          <span className="font-semibold text-gray-900">{data.totalPages}</span>
        </p>

        {/* Pagination Buttons */}
        <div className="flex items-center gap-2">
          {/* Previous */}
          <Link
            href={`/dashboard/admin/all-properties?page=${page - 1}`}
            className={`h-9 px-4 flex items-center gap-2 rounded-xl border text-sm font-medium transition-all duration-200
            ${
              page === 1
                ? "pointer-events-none bg-gray-100 text-gray-400 border-gray-200"
                : "bg-white text-gray-700 hover:border-primary hover:text-primary hover:shadow-md"
            }`}
          >
            <HiChevronLeft className="text-lg" />
            Previous
          </Link>

          {/* Page Numbers */}
          {Array.from({ length: data.totalPages }, (_, i) => {
            const pageNumber = i + 1;

            return (
              <Link
                key={pageNumber}
                href={`/dashboard/admin/all-properties?page=${pageNumber}`}
                className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold border transition-all duration-200
                ${
                  page === pageNumber
                    ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-600/20"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5"
                }`}
              >
                {pageNumber}
              </Link>
            );
          })}

          {/* Next */}
          <Link
            href={`/dashboard/admin/all-properties?page=${page + 1}`}
            className={`h-9 px-4 flex items-center gap-2 rounded-xl border text-sm font-medium transition-all duration-200
            ${
              page === data.totalPages
                ? "pointer-events-none bg-gray-100 text-gray-400 border-gray-200"
                : "bg-white text-gray-700 hover:border-primary hover:text-primary hover:shadow-md"
            }`}
          >
            Next
            <HiChevronRight className="text-lg" />
          </Link>
        </div>
      </div>
    </section>
  );
}
