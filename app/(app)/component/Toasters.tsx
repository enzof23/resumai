"use client";

import { LogInLink, ProfileLink, SignUpLink } from "@/app/components/Buttons";

const toasterBaseStyles =
  "flex flex-wrap items-center justify-center md:self-center w-fit py-3 px-3 gap-2 rounded-lg gradient-outline bg-gradient-to-b from-neutral-500 to-neutral-500/50 sm:gap-4 sm:px-4 md:my-[-25px]";

const toasterHeaderStyles =
  "text-sm font-light text-neutral-100 text-center sm:text-start";

export function AuthToaster() {
  return (
    <div className={toasterBaseStyles}>
      <h3 className={toasterHeaderStyles}>
        Want a more accurate and personnalised result ?{" "}
        <br className="flex sm:hidden" /> Create an account or sign in now
      </h3>

      <div className="flex gap-2 w-full sm:w-fit">
        <LogInLink />
        <SignUpLink />
      </div>
    </div>
  );
}

export function CompleteProfileToaster() {
  return (
    <div className={toasterBaseStyles}>
      <h3 className={toasterHeaderStyles}>
        Complete your profile for an even more accurate result !
      </h3>

      <ProfileLink />
    </div>
  );
}
