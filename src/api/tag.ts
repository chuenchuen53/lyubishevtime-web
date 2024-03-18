const baseUrl: string = import.meta.env.VITE_API_BASE_URL;

export async function listTags(): Promise<any> {
  console.log("here");

  const token = localStorage.getItem("token");
  console.log("listTags ~ token:", token);

  const resp = await fetch(`${baseUrl}/time-event-tag`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (resp.status === 200) {
    const data = await resp.json();
    return data;
  }

  throw new Error("api failed");
}
