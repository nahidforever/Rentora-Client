import Image from "next/image";
import { Mail, Shield, Calendar } from "lucide-react";

export default function ProfileCard({ user }) {
  return (
    <section className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">
        {/* Header */}
        <div className="h-36 bg-gradient-to-r from-blue-600 to-indigo-600" />

        {/* Content */}
        <div className="px-8 pb-10 relative">
          {/* Avatar */}
          <div className="-mt-16 mb-6">
            <Image
              src={user?.image}
              alt={user?.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>

          {/* Name */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">{user?.name}</h1>

            <p className="text-gray-500 mt-1">Welcome back 👋</p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="border rounded-2xl p-6 bg-gray-50">
              <Mail className="text-blue-600 mb-4" />

              <h3 className="font-semibold text-gray-800">Email</h3>

              <p className="text-sm text-gray-500 mt-2 break-all">
                {user?.email}
              </p>
            </div>

            {/* Role */}
            <div className="border rounded-2xl p-6 bg-gray-50">
              <Shield className="text-green-600 mb-4" />

              <h3 className="font-semibold text-gray-800">Role</h3>

              <p className="text-sm text-gray-500 mt-2 capitalize">
                {user?.role}
              </p>
            </div>

            {/* Created */}
            <div className="border rounded-2xl p-6 bg-gray-50">
              <Calendar className="text-orange-600 mb-4" />

              <h3 className="font-semibold text-gray-800">Joined</h3>

              <p className="text-sm text-gray-500 mt-2">
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
