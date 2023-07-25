"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/supabase/client";

const baseStyles =
  "border-[2px] grid place-items-center max-w-fit px-3 py-1 rounded-md font-semibold text-xs text-neutral-300 border-neutral-300 md:hover:text-neutral-50 md:hover:border-neutral-900 md:hover:bg-gradient-to-b md:hover:from-neutral-900 md:hover:to-neutral-800 duration-300";

export function LogInButton() {
  return (
    <Link href={"/connexion?auth=login"} className={baseStyles}>
      LOG IN
    </Link>
  );
}

export function SignUpButton() {
  return (
    <Link href={"/connexion?auth=signup"} className={baseStyles}>
      SIGN UP
    </Link>
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
    <button onClick={handleSignOut} className={baseStyles}>
      SIGN OUT
    </button>
  );
}

export function ProfileLink() {
  return (
    <Link href={"/profile"} className={baseStyles}>
      PROFILE
    </Link>
  );
}
