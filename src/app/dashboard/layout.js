import DashboardSidebar from "@/components/dashboard/DasboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  /*
    Pass only the required serializable user fields
    from the Server Component to Client Components.
  */
  const initialUser = session?.user
    ? {
        id: session.user.id || "",
        name: session.user.name || "",
        email: session.user.email || "",
        role: session.user.role || "tenant",
      }
    : null;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-slate-100 md:flex-row">
      {/* Role-Based Sidebar */}
      <DashboardSidebar initialUser={initialUser} />

      {/* Main Dashboard Area */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {/* Desktop Topbar */}
        <DashboardTopbar initialUser={initialUser} />

        {/* Scrollable Dashboard Content */}
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-5 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
