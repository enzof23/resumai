"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { AuthToaster } from "./Toasters";
import {
  CoverLetterResponseInput,
  Input,
  JobDescriptionInput,
} from "@/app/components/Inputs";
import { IoMdArrowBack } from "react-icons/io";
import { DownloadDOCX, DownloadPDF } from "@/components/ui/buttons";

export default function UnauthMain() {
  const [companyName, setCompanyName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
  } = useChat({
    api: "/api/gpt",
    body: { companyName, jobTitle },
  });

  // Cover Letter Form
  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-full gap-y-6 md:gap-y-16 md:pt-12">
        <div className="flex flex-col gap-y-1 md:items-center md:text-center">
          <h1 className="py-2 text-3xl font-inter font-bold tracking-tighter bg-gradient-to-b from-neutral-50 to-neutral-50/50 bg-clip-text text-transparent sm:text-5xl md:text-6xl">
            Get your dream job with{" "}
            <span className="font-mono underline decoration-neutral-400 decoration-[3px]">
              resumai
            </span>
          </h1>

          <p className="font-inter text-sm font-light leading-4 text-neutral-400 max-w-[65ch] md:text-base md:leading-5">
            Welcome to the future of cover letters - where AI empowers you to
            create compelling and tailored cover letters for any job offer
            effortlessly
          </p>
        </div>

        <AuthToaster />

        <div className="flex items-center self-center w-full flex-col gap-y-4 sm:max-w-2xl">
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

  // Display loading & response on submit
  const response = messages
    .filter((m) => m.role === "assistant")
    .map((m) => m.content);

  return (
    <div className="self-center flex-1 flex flex-col gap-3 w-full pt-4 sm:gap-4 sm:max-w-2xl sm:pt-12">
      <button
        onClick={() => {
          setMessages([]);
          setCompanyName("");
          setJobTitle("");
        }}
        className="grid place-items-center w-fit"
      >
        <IoMdArrowBack className="text-2xl" />
      </button>

      <div className="flex flex-col">
        <h3 className="text-xl font-medium text-neutral-200 sm:text-3xl">
          Your cover letter for{" "}
          <span className="font-mono tracking-tight underline capitalize text-neutral-50">
            {jobTitle}
          </span>{" "}
          at{" "}
          <span className="font-mono tracking-tight underline capitalize text-neutral-50">
            {companyName}
          </span>
        </h3>

        <p className="text-sm text-neutral-500 leading-4">
          Note: Resumai is an experimental AI model and may produce incorrect
          results or inaccuracies. We recommend that you give it a thorough read
          and modify it if necessary before sending it to recruiters.
        </p>
      </div>

      {messages.length === 1 ? (
        <div className="font-mono bg-neutral-900 px-2 py-2 w-full border-2 rounded-lg sm:px-3 text-neutral-600 border-neutral-600 h-[20ch] animate-pulse">
          Loading...
        </div>
      ) : (
        <>
          <CoverLetterResponseInput id="response" response={response[0]} />
          {!isLoading && (
            <div className="flex flex-col flex-1 gap-2 sm:flex-row">
              <DownloadDOCX />
              <DownloadPDF />
            </div>
          )}
        </>
      )}
    </div>
  );
}
