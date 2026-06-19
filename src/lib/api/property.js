const baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getOwnerProperties = async (ownerId, token) => {
  try {
    const res = await fetch(`${baseURL}/owner/properties/${ownerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch properties");

    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
