"use client";

import { Input } from "@/app/components/Inputs";
import { handleSignUp } from "../actions";
import FormWrapper from "./wrapper";
import { AuthButton } from "@/app/components/Buttons";
import Link from "next/link";

export default function Signup() {
  return (
    <FormWrapper>
      <h3 className="text-lg md:text-2xl text-neutral-50 font-medium">
        Create your account
      </h3>

      {/* <button>Continue with Google</button> */}

      <form className="flex flex-col gap-y-2 md:gap-y-4" action={handleSignUp}>
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

        <Input
          id="confirm"
          label="confirm password"
          type="password"
          placeholder="**********"
          required={true}
        />

        <AuthButton text="sign up" />
      </form>

      <div className="text-sm flex flex-col sm:flex-row gap-x-1 self-center mt-2">
        <p className="text-neutral-50">Already registered ?</p>
        <Link
          href="/connexion?auth=login"
          className="md:hover:underline underline md:no-underline font-medium text-white"
        >
          Log in !
        </Link>
      </div>
    </FormWrapper>
  );
}
