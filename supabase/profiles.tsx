"use client";

import { supabaseClient } from "./client";
import { createContext, useContext, useEffect, useState } from "react";

import type { PROFILE } from "@/lib/database.types";

type ProfileContext = { realtimeProfiles: PROFILE[] };

const Context = createContext<ProfileContext | undefined>(undefined);

export default function ProfileProvider({
  children,
  profile,
  auth_id,
}: {
  children: React.ReactNode;
  profile: PROFILE[];
  auth_id: string;
}) {
  const supabase = supabaseClient();
  const [realtimeProfiles, setRealtimeProfiles] = useState<PROFILE[]>(profile);

  console.log(profile);

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
          const updatedProfile = payload.new as PROFILE[];
          setRealtimeProfiles(updatedProfile);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [auth_id, supabase]);

  return (
    <Context.Provider value={{ realtimeProfiles }}>{children}</Context.Provider>
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
