export async function apiUtil<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("jwt-token="))
    ?.split("=")[1];

  if (!token) {
    throw new Error("JWT token not found");
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // Only try to parse JSON if content exists
  const contentType = response.headers.get("Content-Type");
  if (response.status === 204 || !contentType?.includes("application/json")) {
    return {} as T;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }

  return response.json() as Promise<T>;
}
