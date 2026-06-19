"use server";

const baseURl = process.env.NEXT_PUBLIC_SERVER_URL;

export const addProperty = async (property) => {
  const res = await fetch(`${baseURl}/owner/property`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(property),
  });

  return await res.json();
};
