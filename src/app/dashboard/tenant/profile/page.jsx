import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ProfileCard from "@/components/dashboard/ProfileCard";


export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <ProfileCard user={session?.user} />;
}