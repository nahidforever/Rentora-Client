import DashboardSidebar from "@/components/dashboard/DasboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen flex bg-gray-50">
      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP BAR */}
        <div></div>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </div>
    </div>
  );
}
