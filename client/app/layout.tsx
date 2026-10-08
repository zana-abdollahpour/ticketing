import { ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.css";

import Header from "@/components/layout/header";
import buildClient from "../lib/build-client";

interface CurrentUserResponse {
  currentUser: {
    id: string;
    email: string;
  } | null;
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const client = await buildClient();
  const { data } = await client.get<CurrentUserResponse>(
    "/api/users/currentuser",
  );

  return (
    <html lang="en">
      <body>
        <Header currentUser={data.currentUser} />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
