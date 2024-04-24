"use client";

import { InputWrapper, Input, TextArea } from "@/components/ui/inputs";
import { FormEvent } from "react";

export default function Form() {
  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
  }
  return (
    <form onSubmit={submitForm} className="flex flex-col gap-3">
      <InputWrapper name="company" label="Company Name">
        <Input name="company" placeholder="Celestial Coloniser" />
      </InputWrapper>

      <InputWrapper name="role" label="Role Name">
        <Input name="role" placeholder="Mars Colonisation Volunteer" />
      </InputWrapper>

      <InputWrapper name="description" label="Job Description">
        <TextArea
          name="description"
          placeholder="We are looking for a brave adventurer to go on a special mission..."
        />
      </InputWrapper>

      {/* disable button on submit */}
      <button
        type="submit"
        className="mt-2 uppercase text-sm font-semibold tracking-wide py-3 px-4 border-2 border-slate-400/80 rounded-lg bg-gradient-to-br from-slate-900 to-slate-600 hover-outline transition-all duration-200"
      >
        Write my cover letter
      </button>
    </form>
  );
}
