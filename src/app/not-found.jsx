import Link from "next/link";
import { FaSearch, FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
      <div className="text-center max-w-md w-full">
        {/* Icon */}
        <div className="text-5xl sm:text-6xl text-blue-600 flex justify-center mb-4">
          <FaSearch />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          404 - Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-500 mt-4 text-sm sm:text-base md:text-lg leading-relaxed px-2">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-7 px-5 sm:px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition text-sm sm:text-base"
        >
          <FaHome />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
