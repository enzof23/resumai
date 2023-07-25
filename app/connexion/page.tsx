"use client";

import { useSearchParams } from "next/navigation";
import Login from "./components/Login";

export default function ConnexionPage() {
  const searchParams = useSearchParams();
  const auth = searchParams.get("auth");

  if (auth === "login") {
    return <Login />;
  }

  if (auth === "signup") {
    return <div>signup</div>;
  }

  return <div>login</div>;
}
