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
          event: "*",
          schema: "public",
          table: "experience",
          filter: `auth_id=eq.${auth_id}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newExperience = payload.new as EXPERIENCE;
            setUserExperience((prev) => [...prev, newExperience]);
          }

          if (payload.eventType === "UPDATE") {
            const updatedExperience = payload.new as EXPERIENCE;
            const { experience_id } = updatedExperience;

            setUserExperience((prev) =>
              prev.map((x) =>
                x.experience_id === experience_id ? updatedExperience : x
              )
            );
          }

          if (payload.eventType === "DELETE") {
            const deletedExperience = payload.old as EXPERIENCE;
            const { experience_id } = deletedExperience;

            setUserExperience((prev) =>
              prev.filter((x) => x.experience_id !== experience_id)
            );
          }
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
