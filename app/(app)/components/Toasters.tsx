"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { useExperience } from "@/supabase/tables/experiences";
import { useProfiles } from "@/supabase/tables/profiles";

import { LogInLink, SignUpLink } from "@/components/ui/buttons";
import CircularProgress from "@/app/components/CircularProgress";

const toasterBaseStyles =
  "flex flex-wrap items-center justify-center w-fit gap-3 rounded-lg bg-gradient-to-b from-neutral-500 to-neutral-500/50 sm:gap-4 sm:px-4 md:my-[-25px] md:self-center";

const toasterHeaderStyles =
  "text-sm font-light text-neutral-100 text-center sm:text-start";

export function AuthToaster() {
  return (
    <div className={`${toasterBaseStyles} p-3 gradient-outline`}>
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
  const { user_profile } = useProfiles();
  const { user_experience } = useExperience();

  const { bio, location, primary_role, years_experience } = user_profile;
  const hasExperience = user_experience.length;

  const [filled, setFilled] = useState<number>(getFilled());
  const profileIncomplete = filled < 7;

  function getFilled() {
    let amount = 2;

    // Check if other fields are provided and increment the information level accordingly
    if (bio) amount++;
    if (location) amount++;
    if (primary_role) amount++;
    if (years_experience) amount++;
    if (hasExperience) amount++;

    return amount;
  }

  useEffect(
    () => setFilled(getFilled()),
    // eslint-disable-next-line
    [user_experience, user_profile]
  );

  if (profileIncomplete)
    return (
      <Link
        href={"/profile"}
        className={`${toasterBaseStyles} px-3 py-2 hover-outline duration-200`}
      >
        <h3 className={toasterHeaderStyles}>
          Your profile is incomplete. Tell us more about yourself to improve
          your results
        </h3>

        <CircularProgress filled={filled} />
      </Link>
    );

  return null;
}
