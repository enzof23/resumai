"use client";

import { useState } from "react";
import { useChat } from "ai/react";

import { LogInLink, SignUpLink } from "../components/Buttons";
import { Input, TextArea } from "../components/Inputs";

export default function Home() {
  const [companyName, setCompanyName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/gpt",
    body: { companyName, jobTitle },
  });

  return (
    <div className="flex flex-col h-full gap-y-6 md:gap-y-16 pt-4 md:pt-12">
      {messages.length === 0 ? (
        <>
          {/* Hero Header */}
          <div className="flex flex-col gap-y-1 items-center text-center">
            <h1 className="group text-3xl sm:text-5xl font-inter bg-gradient-to-b from-neutral-50 to-neutral-50/50 bg-clip-text text-transparent font-bold md:text-6xl tracking-tighter py-2">
              Get your dream job with{" "}
              <span className="font-bold underline decoration-neutral-400 font-mono decoration-[3px]">
                resumai
              </span>
            </h1>

            <p className="font-inter md:text-base text-neutral-400 max-w-[65ch] font-light md:leading-5 text-sm leading-4">
              Welcome to the future of cover letters – where AI empowers you to
              create compelling and tailored cover letters for any job offer
              effortlessly
            </p>
          </div>

          <div className="flex rounded-lg gradient-outline py-3 bg-gradient-to-b my-[-25px] from-neutral-500 to-neutral-500/50 px-4 gap-4 items-center justify-center w-fit self-center">
            <h3 className="text-sm text-neutral-100">
              Want a more accurate and personnalised result ? Create an account
              or sign in now
            </h3>

            <div className="flex gap-2">
              <LogInLink />
              <SignUpLink />
            </div>
          </div>

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

            <TextArea
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
        </>
      ) : messages.length === 1 ? (
        <p>loading...</p>
      ) : (
        <div>
          {messages
            .filter((m) => m.role === "assistant")
            .map((m) => (
              <div key={m.id}>{m.content}</div>
            ))}
        </div>
      )}
    </div>
  );
}
