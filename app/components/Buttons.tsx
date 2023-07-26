"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/supabase/client";
import { HalfCircleSpinner } from "react-epic-spinners";

const buttonBaseStyle =
  "border-[2px] grid place-items-center rounded-md md:hover:text-neutral-50 duration-300";

const linkBaseStyle =
  "max-w-fit px-3 py-1 text-xs text-neutral-200 font-semibold border-neutral-300 md:hover:border-neutral-900 md:hover:bg-gradient-to-b md:hover:from-neutral-900 md:hover:to-neutral-800 ";

export function LogInLink() {
  return (
    <Link
      href={"/connexion?auth=login"}
      className={`${buttonBaseStyle} ${linkBaseStyle}`}
    >
      LOG IN
    </Link>
  );
}

export function SignUpLink() {
  return (
    <Link
      href={"/connexion?auth=signup"}
      className={`${buttonBaseStyle} ${linkBaseStyle}`}
    >
      SIGN UP
    </Link>
  );
}

export function AuthButton({
  text,
  loading,
}: {
  text: string;
  loading: boolean;
}) {
  return (
    <button
      className={`${buttonBaseStyle} capitalize w-full py-2 text-neutral-200 font-medium border-neutral-200 md:hover:border-neutral-800 md:hover:bg-gradient-to-b md:hover:from-neutral-500 md:hover:to-neutral-700/50`}
      type="submit"
    >
      {loading ? <HalfCircleSpinner size={24} /> : text}
    </button>
  );
}

export function SignOutButton() {
  const router = useRouter();
  const supabase = supabaseClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button onClick={handleSignOut} className={buttonBaseStyle}>
      SIGN OUT
    </button>
  );
}

export function ProfileLink() {
  return (
    <Link href={"/profile"} className={buttonBaseStyle}>
      PROFILE
    </Link>
  );
}
