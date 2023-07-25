"use client";

import { useSearchParams } from "next/navigation";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function ConnexionPage() {
  const searchParams = useSearchParams();
  const auth = searchParams.get("auth");

  if (auth === "login") {
    return <Login />;
  }

  if (auth === "signup") {
    return <Signup />;
  }

  return <Login />;
}
