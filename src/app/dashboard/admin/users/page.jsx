import ChangeRoleClient from "@/components/dashboard/ChangeRoleClient";
import { getTokenServer } from "@/lib/getTokenServer";

import { Mail, ShieldCheck, UserCog, Users } from "lucide-react";

async function getUsers(token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return res.json();
}

function getRoleStyles(role) {
  const normalizedRole = role || "tenant";

  const styles = {
    admin: "border-purple-200 bg-purple-50 text-purple-700",
    owner: "border-amber-200 bg-amber-50 text-amber-700",
    tenant: "border-blue-200 bg-blue-50 text-blue-700",
  };

  return styles[normalizedRole] || styles.tenant;
}

function getAvatarStyles(role) {
  const normalizedRole = role || "tenant";

  const styles = {
    admin: "from-purple-600 to-indigo-500 shadow-purple-500/20",
    owner: "from-amber-500 to-orange-500 shadow-amber-500/20",
    tenant: "from-blue-600 to-cyan-500 shadow-blue-500/20",
  };

  return styles[normalizedRole] || styles.tenant;
}

export default async function UsersPage() {
  const token = await getTokenServer();
  const users = await getUsers(token);

  const userList = Array.isArray(users) ? users : [];

  return (
    <section className="space-y-6">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:p-6">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-500/10 blur-[70px]" />

        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-cyan-400/10 blur-[80px]" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Heading */}
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
              <Users size={23} />
            </div>

            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                User Management
              </p>

              <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500">
                Review registered users and manage their platform roles from one
                place.
              </p>
            </div>
          </div>

          {/* Total Users */}
          <div className="flex min-w-40 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <ShieldCheck size={19} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Total Users
              </p>

              <p className="mt-0.5 text-xl font-black text-slate-900">
                {userList.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Content */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
        {/* Table Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Registered Users
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Manage account roles and user access.
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            System Active
          </div>
        </div>

        {userList.length > 0 ? (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      User
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      Email Address
                    </th>

                    <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      Current Role
                    </th>

                    <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {userList.map((user) => {
                    const role = user.role || "tenant";
                    const userInitial =
                      user.name?.charAt(0).toUpperCase() || "U";

                    return (
                      <tr
                        key={user._id}
                        className="group transition-colors duration-200 hover:bg-blue-50/35"
                      >
                        {/* User */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white shadow-lg ${getAvatarStyles(
                                role,
                              )}`}
                            >
                              {userInitial}
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-52 truncate font-bold text-slate-800">
                                {user.name || "Unnamed User"}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-400">
                                Rentora member
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-6 py-4">
                          <div className="flex max-w-72 items-center gap-2 text-slate-600">
                            <Mail
                              size={15}
                              className="shrink-0 text-slate-400"
                            />

                            <span className="truncate">{user.email}</span>
                          </div>
                        </td>

                        {/* Role */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold capitalize ${getRoleStyles(
                              role,
                            )}`}
                          >
                            <ShieldCheck size={13} />
                            {role}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center justify-end">
                            <ChangeRoleClient user={user} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile User Cards */}
            <div className="divide-y divide-slate-100 md:hidden">
              {userList.map((user) => {
                const role = user.role || "tenant";
                const userInitial = user.name?.charAt(0).toUpperCase() || "U";

                return (
                  <article
                    key={user._id}
                    className="p-4 transition-colors duration-200 hover:bg-slate-50 sm:p-5"
                  >
                    {/* User Heading */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white shadow-lg ${getAvatarStyles(
                          role,
                        )}`}
                      >
                        {userInitial}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-slate-900">
                          {user.name || "Unnamed User"}
                        </p>

                        <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-slate-500">
                          <Mail size={13} className="shrink-0" />

                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold capitalize ${getRoleStyles(
                          role,
                        )}`}
                      >
                        {role}
                      </span>
                    </div>

                    {/* Mobile Action */}
                    <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <UserCog size={15} className="text-blue-500" />
                        Manage role
                      </div>

                      <ChangeRoleClient user={user} />
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex min-h-80 flex-col items-center justify-center px-5 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 text-slate-400">
              <Users size={29} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-800">
              No users found
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Registered users will appear here when they become available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
