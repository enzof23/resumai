"use client";

import { LogInLink, ProfileLink, SignUpLink } from "@/app/components/Buttons";

export function AuthToaster() {
  return (
    <div className="flex rounded-lg gradient-outline py-3 bg-gradient-to-b my-[-25px] from-neutral-500 to-neutral-500/50 px-4 gap-4 items-center justify-center w-fit self-center">
      <h3 className="text-sm text-neutral-100">
        Want a more accurate and personnalised result ? Create an account or
        sign in now
      </h3>

      <div className="flex gap-2">
        <LogInLink />
        <SignUpLink />
      </div>
    </div>
  );
}

export function CompleteProfileToaster() {
  return (
    <div className="flex rounded-lg gradient-outline py-3 bg-gradient-to-b my-[-25px] from-neutral-500 to-neutral-500/50 px-4 gap-4 items-center justify-center w-fit self-center">
      <h3 className="text-sm text-neutral-100">
        Complete your profile for an even more accurate result !
      </h3>

      <ProfileLink />
    </div>
  );
}
