"use client";

import { useState } from "react";
import { useChat } from "ai/react";

import Hero from "./Hero";
import { Input, JobDescriptionInput } from "@/app/components/Inputs";
import { AuthToaster, CompleteProfileToaster } from "./Toasters";

import type { Session } from "@supabase/auth-helpers-nextjs";

export default function Main(props: { session: Session | null }) {
  const [companyName, setCompanyName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/gpt",
    body: { companyName, jobTitle },
  });

  if (messages.length === 1) return <p>loading...</p>;

  if (messages.length > 2)
    return (
      <div>
        {messages
          .filter((m) => m.role === "assistant")
          .map((m) => (
            <div key={m.id}>{m.content}</div>
          ))}
      </div>
    );

  return (
    <div className="flex flex-col h-full gap-y-6 md:gap-y-16 md:pt-12">
      <Hero />
      {!props.session && <AuthToaster />}
      {props.session && <CompleteProfileToaster />}

      {/* Cover Letter Form */}

      <div className="flex items-center self-center w-full flex-col gap-y-4 md:max-w-[85%]">
        <Input
          id="company-name"
          type="text"
          label="Company Name"
          placeholder="Celestial Colonizers"
          value={companyName}
          required={true}
          onChange={setCompanyName}
        />

        <Input
          id="job-title"
          type="text"
          label="Job Title"
          placeholder="Mars Colonization Volunteer"
          value={jobTitle}
          required={true}
          onChange={setJobTitle}
        />

        <JobDescriptionInput
          id="job-description"
          label="Job Description"
          placeholder="We are looking for a brave adventurer to go on a special mission..."
          value={input}
          required={true}
          onChange={handleInputChange}
        />

        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="border uppercase text-sm grid place-items-center py-3 px-6 rounded-md font-semibold text-neutral-200 md:hover:text-neutral-50 border-neutral-500 md:hover:border-neutral-900 bg-gradient-to-b from-neutral-900 to-neutral-800 md:hover:shadow-[0_0_5px_rgba(255,255,255,0.8)] duration-150 disabled:hidden"
          >
            Write my cover letter
          </button>
        </form>
      </div>
    </div>
  );
}
