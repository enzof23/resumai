"use client";

import { FormEvent, useEffect, useState } from "react";

import { supabaseClient } from "@/supabase/client";

import FormWrapper from "./wrapper";
import { Input } from "@/app/components/Inputs";
import { AuthButton } from "@/components/ui/buttons";

const passwordComplexity =
  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/;

export default function Signup() {
  const [view, setView] = useState<"form" | "success">("form");

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");

  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [confirmError, setConfirmError] = useState<boolean>(false);

  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const passwordValid = passwordComplexity.test(password);
  const passwordMatch = password === confirm;

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    try {
      if (!passwordValid) {
        setPasswordError(true);
        return;
      }

      if (!passwordMatch) {
        setConfirmError(true);
        return;
      }

      if (passwordValid && passwordMatch) {
        setLoader(true);

        const supabase = supabaseClient();

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/api/callback?next=/profile`,
            data: {
              full_name: name,
            },
          },
        });

        if (error) {
          setError(error.message);
          throw new Error(error.message);
        }

        setView("success");
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }

  useEffect(() => {
    if (passwordComplexity.test(password)) setPasswordError(false);
    if (passwordMatch) setConfirmError(false);
  }, [password, passwordMatch]);

  return (
    <>
      {view === "form" ? (
        <FormWrapper title="Create your account" link="login" error={error}>
          <form
            className="flex flex-col gap-y-2 md:gap-y-4"
            onSubmit={handleSignUp}
          >
            <Input
              id="name"
              label="full name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={setName}
              required={true}
            />

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
              isError={passwordError}
              span={
                "Password must contain at least 8 characters, including an uppercase letter, a number and a special character."
              }
            />

            <Input
              id="confirm"
              label="confirm password"
              type="password"
              placeholder="**********"
              value={confirm}
              onChange={setConfirm}
              required={true}
              isError={confirmError}
              span={
                confirmError
                  ? "The confirmation and the password do not match."
                  : undefined
              }
            />

            <AuthButton text="sign up" loading={loader} />
          </form>
        </FormWrapper>
      ) : (
        <div className="flex flex-col gap-y-2 max-w-md border border-slate-50 rounded-lg p-4 sm:p-6 sm:gap-y-4">
          <h3 className="text-xl font-inter font-semibold tracking-tighter leading-6 bg-gradient-to-b from-slate-50 to-slate-50/80 bg-clip-text text-transparent sm:text-2xl">
            Congratulations, your account has been created successfully !
          </h3>

          <div className="flex flex-col gap-y-3 text-sm leading-4 sm:text-base">
            <p className="max-w-[50ch] text-slate-200">
              In order to verify your account, please go to your inbox{" "}
              <span className="font-mono font-medium underline">{email}</span>{" "}
              and click the link we just sent you.
            </p>
            <p className="max-w-[50ch] font-semibold text-slate-300 underline">
              This link will redirect you to our website to complete your
              profile.
            </p>

            <p className="text-sm text-slate-400">
              Remember to check your spam folder !
            </p>
          </div>
        </div>
      )}
    </>
  );
}
