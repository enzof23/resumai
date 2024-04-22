"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HalfCircleSpinner } from "react-epic-spinners";

import { supabaseClient } from "@/supabase/client";
import { PiSignOutBold } from "react-icons/pi";

const buttonBaseStyle =
  "grid place-items-center min-w-[75px] rounded-md duration-300 border-[2px] md:hover:text-neutral-50";

const linkBaseStyle =
  "text-xs text-neutral-200 font-medium font-mono tracking-wide w-full px-3 py-2 border-neutral-300 sm:max-w-fit sm:py-1 md:hover:border-neutral-900 md:hover:bg-gradient-to-b md:hover:from-neutral-900 md:hover:to-neutral-800 ";

const downloadButtonStyle =
  "flex-1 p-2 bg-gradient-to-b from-neutral-700 to neutral-800/50 border-neutral-700 md:hover:border-neutral-800 md:hover:from-neutral-500 md:hover:to-neutral-700/50";

export function SignOutButton() {
  const router = useRouter();
  const supabase = supabaseClient();

  const [loader, setLoader] = useState<boolean>(false);

  const handleSignOut = async () => {
    setLoader(true);

    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button
      id="signout"
      disabled={loader}
      onClick={handleSignOut}
      className={`group lg:self-center flex items-center justify-center gap-1 lg:gap-6
                    w-full sm:min-w-[100px] p-3 sm:py-2 rounded-full bg-neutral-800
                    text-sm leading-4 text-neutral-300 font-medium capitalize
                    transition-all duration-200
                    md:hover:text-white md:hover:bg-neutral-700 lg:hover:px-5
                   `}
    >
      {loader ? (
        <div className="mx-auto">
          <HalfCircleSpinner size={16} />
        </div>
      ) : (
        <>
          <p className="lg:translate-x-2 lg:group-hover:translate-x-0 lg:transition-all lg:duration-200">
            sign out
          </p>
          <div className="lg:translate-x-[-8px] lg:group-hover:translate-x-0 lg:transition-all lg:duration-200">
            <PiSignOutBold />
          </div>
        </>
      )}
    </button>
  );
}

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

export function ProfileLink() {
  return (
    <Link href={"/profile"} className={`${buttonBaseStyle} ${linkBaseStyle}`}>
      PROFILE
    </Link>
  );
}

export function DownloadDOCX() {
  return (
    <button className={`${buttonBaseStyle} ${downloadButtonStyle}`}>
      Download as .docx
    </button>
  );
}

export function DownloadPDF() {
  return (
    <button className={`${buttonBaseStyle} ${downloadButtonStyle}`}>
      Download as PDF
    </button>
  );
}
