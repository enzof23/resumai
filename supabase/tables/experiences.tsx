"use client";

import { supabaseClient } from "../client";
import { createContext, useContext, useEffect, useState } from "react";

import type { EXPERIENCE } from "@/lib/database.types";

type ExperienceContext = { user_experience: EXPERIENCE[] };

const Context = createContext<ExperienceContext | undefined>(undefined);

export default function ExperienceProvider({
  children,
  experience,
  auth_id,
}: {
  children: React.ReactNode;
  experience: EXPERIENCE[];
  auth_id: string;
}) {
  const supabase = supabaseClient();
  const [user_experience, setUserExperience] =
    useState<EXPERIENCE[]>(experience);

  useEffect(() => {
    const channel = supabase
      .channel("experiences-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "experience",
          filter: `auth_id=eq.${auth_id}`,
        },
        (payload) => {
          const newExperience = payload.new as EXPERIENCE;
          setUserExperience((prev) => [...prev, newExperience]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [auth_id, supabase]);

  return (
    <Context.Provider value={{ user_experience }}>{children}</Context.Provider>
  );
}

export const useExperience = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error("useExperience must be used inside ExperienceProvider");
  } else {
    return context;
  }
};
