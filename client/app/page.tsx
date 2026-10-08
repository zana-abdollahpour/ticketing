import buildClient from "@/lib/build-client";

interface CurrentUserResponse {
  currentUser: {
    id: string;
    email: string;
  } | null;
}

export default async function LandingPage() {
  console.log("LANDING PAGE!");
  const client = await buildClient();
  const { data } = await client.get<CurrentUserResponse>(
    "/api/users/currentuser",
  );

  return data.currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
}
