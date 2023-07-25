"use server";

import { revalidatePath } from "next/cache";
import { supabaseActions } from "@/supabase/server-client";

export async function handleSignIn(formData: FormData) {
  const supabase = supabaseActions();

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  await supabase.auth.signInWithPassword({
    email,
    password,
  });

  revalidatePath("/");
}

export async function handleSignUp(formData: FormData) {
  const supabase = supabaseActions();

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const confirm = String(formData.get("confirm"));

  const passwordMatch = password === confirm;

  if (passwordMatch) {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/callback`,
      },
    });
  }

  revalidatePath("/");
}
