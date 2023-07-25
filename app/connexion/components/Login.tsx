"use client";

import Link from "next/link";

import { handleSignIn } from "../actions";

import FormWrapper from "./wrapper";
import { Input } from "@/app/components/Inputs";
import { AuthButton } from "@/app/components/Buttons";

export default function Login() {
  return (
    <FormWrapper>
      <h3 className="text-lg md:text-2xl text-neutral-50 font-medium">
        Login to your account
      </h3>

      {/* <button>Continue with Google</button> */}

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

        <AuthButton text="login" />
      </form>

      <div className="text-sm flex flex-col sm:flex-row gap-x-1 self-center mt-2">
        <p className="text-neutral-50">Not yet registered ?</p>
        <Link
          href="/connexion?auth=signup"
          className="md:hover:underline underline md:no-underline font-medium text-white"
        >
          Create an account
        </Link>
      </div>
    </FormWrapper>
  );
}
