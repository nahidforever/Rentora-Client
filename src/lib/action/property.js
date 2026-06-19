"use server";

import { getTokenServer } from "../getTokenServer";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addProperty = async (property) => {
  const token = await getTokenServer();

  const res = await fetch(`${baseURl}/owner/property`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(property),
  });

  return await res.json();
};
