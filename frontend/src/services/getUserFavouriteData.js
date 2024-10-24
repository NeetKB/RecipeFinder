
// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getUserFavouriteData(token, favouriteData) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ favourites: favouriteData }),

  };

  const response = await fetch(
    `${BACKEND_URL}/recipes/get_favourite_data`,
    requestOptions
  );

  if (response.status !== 201) {
    throw new Error("Unable to fetch followers");
  }

  const data = await response.json();
  return data;
}