"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/supabase/client";

import FormWrapper from "./wrapper";
import { Input } from "@/app/components/Inputs";
import { AuthButton } from "@/app/components/Buttons";

export default function Login() {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn(formData: FormData) {
    try {
      setError(null);
      setLoader(true);

      const supabase = supabaseClient();

      const email = String(formData.get("email"));
      const password = String(formData.get("password"));

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        throw new Error(error.message);
      }

      !error && router.push("/");
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }

  return (
    <FormWrapper title="Login to your account" link="signup" error={error}>
      <form className="flex flex-col gap-y-2 md:gap-y-4" action={handleSignIn}>
        <Input
          id="email"
          label="email"
          type="email"
          placeholder="resumai@example.com"
          required={true}
        />

        <Input
          id="password"
          label="password"
          type="password"
          placeholder="**********"
          required={true}
        />

        <AuthButton text="login" loading={loader} />
      </form>
    </FormWrapper>
  );
}
