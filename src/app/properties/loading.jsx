export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

      <p className="mt-4 text-gray-500 font-medium">Loading properties...</p>
    </div>
  );
}
