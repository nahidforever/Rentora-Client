import { getTokenServer } from "@/lib/getTokenServer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyFavoritesTable from "@/components/MyFavoritesTable";

export default async function FavoritesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/tenant/favorites/${session.user.email}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const favorites = await res.json();

  return <MyFavoritesTable favorites={favorites} />;
}
