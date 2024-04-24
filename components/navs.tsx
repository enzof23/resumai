"use client";

import { useEffect, useRef, useState } from "react";

import { LuUser2 } from "react-icons/lu";
import { RiHomeLine } from "react-icons/ri";
import { IoMenu, IoCloseOutline } from "react-icons/io5";

import { Resumai } from "./logo";
import { SignOutButton } from "./ui/buttons";
import { ConnexionLink, NavigationLink } from "./ui/links";

import type { Session } from "@supabase/auth-helpers-nextjs";

export default function Navs(props: { session: Session | null }) {
  const { session } = props;
  // replace boolean by session
  const hasSession = session ? true : false;

  return (
    <>
      <div className="sm:hidden">
        <SmallScreen auth={hasSession} />
      </div>

      <div className="hidden sm:inline lg:hidden">
        <MediumScreen auth={hasSession} />
      </div>

      <div className="hidden lg:inline">
        <LargeScreen auth={hasSession} />
      </div>
    </>
  );
}

function SmallScreen({ auth }: { auth: boolean }) {
  const menuRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuPosition = menuOpen ? "top-14" : "top-[-375px]";

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
    <nav ref={menuRef} className="fixed top-0 left-0 flex w-full">
      {/* Topbar */}
      <div className="flex-1 z-50 flex justify-between items-center p-3 bg-slate-900">
        <Resumai />

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`text-2xl ${menuOpen ? "hidden" : "inline"}`}
        >
          <IoMenu />
        </button>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`text-2xl ${menuOpen ? "inline" : "hidden"}`}
        >
          <IoCloseOutline />
        </button>
      </div>

      {/* Nav Menu */}
      <div
        id="mobile-menu"
        className={`absolute left-0 w-full ${menuPosition} p-4 z-40 bg-slate-900 border-b-2 border-slate-700/50 transition-all duration-300`}
      >
        {auth ? (
          <div className="flex flex-col gap-3 w-28">
            <div className="flex flex-col gap-2">
              <NavigationLink href={"/"} text="home" icon={<RiHomeLine />} />
              <NavigationLink
                href={"/profile"}
                text="profile"
                icon={<LuUser2 />}
              />
            </div>

            <SignOutButton />
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-28">
            <ConnexionLink href={"/connexion?auth=login"} text="log in" />
            <ConnexionLink href={"/connexion?auth=signup"} text="sign up" />
          </div>
        )}
      </div>
    </nav>
  );
}

function MediumScreen({ auth }: { auth: boolean }) {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-3 bg-slate-900">
      <Resumai />

      {auth ? (
        <div className="flex gap-2">
          <NavigationLink href={"/"} text="home" icon={<RiHomeLine />} />
          <NavigationLink href={"/profile"} text="profile" icon={<LuUser2 />} />
          <SignOutButton />
        </div>
      ) : (
        <div className="flex gap-2">
          <ConnexionLink href={"/connexion?auth=login"} text="log in" />
          <ConnexionLink href={"/connexion?auth=signup"} text="sign up" />
        </div>
      )}
    </nav>
  );
}

function LargeScreen({ auth }: { auth: boolean }) {
  return (
    <nav
      id="sidebar"
      className={`fixed top-0 left-0 h-screen hidden lg:flex flex-col ${
        !auth && "justify-between"
      } gap-8 py-4 px-6 bg-slate-900 w-56 z-10`}
    >
      <Resumai />

      {auth ? (
        <div className="flex-1 flex flex-col justify-between gap-8 pb-4">
          <div className="flex flex-col gap-2">
            <NavigationLink href={"/"} text="home" icon={<RiHomeLine />} />
            <NavigationLink
              href={"/profile"}
              text="profile"
              icon={<LuUser2 />}
            />
          </div>

          <SignOutButton />
        </div>
      ) : (
        <div className="flex flex-col self-end gap-4 pb-4">
          <div className="flex flex-col gap-2 text-slate-200 text-sm font-medium">
            <p>Want a more accurate and personnalised result ?</p>
            <p>Sign in or create an account now !</p>
          </div>

          <div className="flex flex-col justify-self-end gap-2">
            <ConnexionLink href={"/connexion?auth=login"} text="log in" />
            <ConnexionLink href={"/connexion?auth=signup"} text="sign up" />
          </div>
        </div>
      )}
    </nav>
  );
}
