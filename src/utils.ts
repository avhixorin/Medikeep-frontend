import { FetchOptions, FetchWithAuthParams } from "./types/types";
/**
 * Fetches data from a URL with authentication.
 * Requires a user to be logged in (either via auth.currentUser or localStorage).
 *
 * @param {FetchWithAuthParams} params - The parameters for the fetch request.
 * @returns {Promise<Response | undefined>} A Promise that resolves to the Response object, or undefined if an error occurs.
 */

async function fetchWithAuth({
  url,
  options,
}: FetchWithAuthParams): Promise<Response> {

  const token = localStorage.getItem("authToken"); 

  const fetchOptions: RequestInit = {
    ...options,
    credentials: "include",

    headers: {
      ...options?.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  return fetch(url, fetchOptions);
}

export default fetchWithAuth;
