"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/supabase/client";

import FormWrapper from "./wrapper";
import { Input } from "@/app/components/Inputs";
import { AuthButton } from "@/app/components/Buttons";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();

    try {
      setError(null);
      setLoader(true);

      const supabase = supabaseClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        throw new Error(error.message);
      }

      router.refresh();
      router.push("/");
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }

  return (
    <FormWrapper title="Login to your account" link="signup" error={error}>
      <form
        className="flex flex-col gap-y-2 md:gap-y-4"
        onSubmit={handleSignIn}
      >
        <Input
          id="email"
          label="email"
          type="email"
          placeholder="resumai@example.com"
          value={email}
          onChange={setEmail}
          required={true}
        />

        <Input
          id="password"
          label="password"
          type="password"
          placeholder="**********"
          value={password}
          onChange={setPassword}
          required={true}
        />

        <AuthButton text="login" loading={loader} />
      </form>
    </FormWrapper>
  );
}
