"use client";

import { supabaseClient } from "./client";
import { createContext, useContext, useEffect, useState } from "react";

import type { PROFILE } from "@/lib/database.types";

type ProfileContext = { user_profile: PROFILE };

const Context = createContext<ProfileContext | undefined>(undefined);

export default function ProfileProvider({
  children,
  profile,
  auth_id,
}: {
  children: React.ReactNode;
  profile: PROFILE;
  auth_id: string;
}) {
  const supabase = supabaseClient();
  const [user_profile, setUserProfile] = useState<PROFILE>(profile);

  useEffect(() => {
    const channel = supabase
      .channel("profiles-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `auth_id=eq.${auth_id}`,
        },
        (payload) => {
          const updatedProfile = payload.new as PROFILE;
          setUserProfile(updatedProfile);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [auth_id, supabase]);

  return (
    <Context.Provider value={{ user_profile }}>{children}</Context.Provider>
  );
}

export const useProfiles = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error("useProfiles must be used inside ProfileProvider");
  } else {
    return context;
  }
};
