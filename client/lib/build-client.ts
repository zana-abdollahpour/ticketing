import axios from "axios";
import { cookies } from "next/headers";

export default async function buildClient() {
  if (typeof window !== "undefined") {
    return axios.create({ baseURL: "/" });
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return axios.create({
    baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
    headers: {
      Host: "ticketing.dev",
      Cookie: cookieHeader,
    },
  });
}
