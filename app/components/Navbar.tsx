"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";

import { LogInLink, ProfileLink, SignOutButton, SignUpLink } from "./Buttons";
import Logo from "./Logo";

export function DesktopNavbar(props: { session: Session | null }) {
  return (
    <div className="hidden fixed z-[85] md:flex w-full justify-between px-5 py-4">
      <Logo />

      {props.session ? (
        <div className="flex gap-x-3">
          <ProfileLink />
          <SignOutButton />
        </div>
      ) : (
        <div className="flex gap-x-3">
          <LogInLink />
          <SignUpLink />
        </div>
      )}
    </div>
  );
}

export function MobileNavbar(props: { session: Session | null }) {
  const menuRef = useRef<HTMLElement>(null);

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  // close menu when user clicks outside menu
  useEffect(() => {
    const closeMenuOnClickAway = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", closeMenuOnClickAway);

    return () => {
      document.removeEventListener("click", closeMenuOnClickAway);
    };
  }, []);

  return (
    <nav className="fixed z-[85] flex w-full md:hidden" ref={menuRef}>
      <div className="z-[90] flex w-full items-center justify-between bg-black py-2 px-3">
        <Logo />

        <div
          className="grid h-8 w-8 place-items-center fill-neutral-200"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" />
            </svg>
          )}
        </div>
      </div>

      <div
        className={`absolute left-0 z-[80] flex w-full gap-2 border-b border-neutral-700 bg-black px-4 pb-4 pt-16 shadow-[0_0_2px_1px] shadow-neutral-700 duration-500 ${
          menuOpen ? "top-0" : "-top-[460px]"
        }`}
      >
        {props.session ? (
          <div className="flex gap-x-3">
            <ProfileLink />
            <SignOutButton />
          </div>
        ) : (
          <div className="flex gap-x-3">
            <LogInLink />
            <SignUpLink />
          </div>
        )}
      </div>
    </nav>
  );
}
