import Link from "next/link";
import MyBookingsTable from "@/components/dashboard/MyBookingsTable";
import { getTokenServer } from "@/lib/getTokenServer";
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlineCalendar,
} from "react-icons/hi";

export default async function MyBookingsPage({ searchParams }) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;

  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tenant/bookings?page=${page}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Bookings</h1>

      {!data.bookings?.length ? (
        <div className="bg-white border rounded-3xl shadow-sm py-20 px-6 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-6">
            <HiOutlineCalendar className="text-4xl text-purple-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Bookings Yet
          </h2>

          <p className="text-gray-500 max-w-md mb-6">
            You have not booked any properties yet. Explore available properties
            and find your next home today.
          </p>

          <Link
            href="/properties"
            className="px-6 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all duration-200 shadow-lg shadow-purple-600/20"
          >
            Browse Properties
          </Link>
        </div>
      ) : (
        <>
          <MyBookingsTable bookings={data.bookings} />

          {/* Pagination */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Page Info */}
            <p className="text-sm text-gray-500">
              Page <span className="font-semibold text-gray-900">{page}</span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {data.totalPages}
              </span>
            </p>

            <div className="flex items-center gap-2">
              {/* Previous */}
              <Link
                href={`/dashboard/tenant/bookings?page=${page - 1}`}
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
                    href={`/dashboard/tenant/bookings?page=${pageNumber}`}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-semibold border transition-all duration-200
                    ${
                      page === pageNumber
                        ? "bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-600/20 scale-105"
                        : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}

              {/* Next */}
              <Link
                href={`/dashboard/tenant/bookings?page=${page + 1}`}
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
        </>
      )}
    </div>
  );
}
