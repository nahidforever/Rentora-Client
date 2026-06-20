import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertiesPagination({ page, totalPages }) {
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div className="flex items-center gap-2 mt-8">
      {/* Previous */}
      <Link
        href={`/properties?page=${page - 1}`}
        className={`flex items-center gap-1  px-2 py-1 text-[11px] rounded-lg border bg-white transition
        ${page === 1 ? "pointer-events-none opacity-50" : "hover:bg-gray-100"}`}
      >
        <ChevronLeft size={12} />
        Prev
      </Link>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <Link
            key={p}
            href={`/properties?page=${p}`}
            className={`w-7 h-7 flex items-center justify-center text-[11px] rounded-lg border transition
            ${
              p === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {p}
          </Link>
        ))}
      </div>

      {/* Next */}
      <Link
        href={`/properties?page=${page + 1}`}
        className={`flex items-center gap-1 px-2 py-1  text-[11px] rounded-lg border bg-white transition
        ${
          page === totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-gray-100"
        }`}
      >
        Next
        <ChevronRight size={12} />
      </Link>
    </div>
  );
}
