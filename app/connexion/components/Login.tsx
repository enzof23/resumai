"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/supabase/client";

import FormWrapper from "./wrapper";

export default function Login() {
  const router = useRouter();
  const supabase = supabaseClient();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  return (
    <FormWrapper>
      <h3>Login to your account</h3>
    </FormWrapper>
  );
}
