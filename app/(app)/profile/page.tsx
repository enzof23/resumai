"use client";

import {
  DisabledInput,
  Dropdown,
  Input,
  TextArea,
} from "@/app/components/Inputs";
import { useProfiles } from "@/supabase/profiles";
import { useState } from "react";

export default function ProfilePage() {
  const {
    user_profile: {
      auth_id,
      bio,
      email,
      full_name,
      location,
      primary_role,
      profile_id,
      years_experience,
    },
  } = useProfiles();

  const [username, setUsername] = useState<string>(full_name);
  const [nameUpd, setNameUpd] = useState<boolean>(false);

  const [role, setRole] = useState<string>(primary_role);
  const [roleUpd, setRoleUpd] = useState<boolean>(false);

  const [loc, setLoc] = useState<string>(location);
  const [locUpd, setLocUpd] = useState<boolean>(false);

  const [experience, setExperience] = useState<string>(years_experience);
  const [experienceUpd, setExperienceUpd] = useState<boolean>(false);

  const [biog, setBiog] = useState<string>(bio);
  const [biogUpd, setBiogUpd] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-10 place-self-center border border-neutral-50 rounded-sm p-4 mt-4 w-full max-w-5xl sm:p-6 sm:mt-0">
      <section className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <div className="flex flex-col gap-1 sm:max-w-[30%]">
          <h3 className="font-mono font-semibold text-neutral-100 text-lg sm:text-xl">
            Tell us about yourself
          </h3>

          <p className="text-sm text-neutral-300">
            To start your personalized cover letter, tell us more about yourself
            and <span className="font-mono underline">resumai</span> will do the
            rest.
          </p>
        </div>

        <div className="flex flex-col flex-1 gap-y-4">
          <Input
            id="name"
            label="Full name"
            value={username}
            onChange={setUsername}
          />

          <Input
            id="role"
            label="Primary role"
            placeholder="Cosmic Potato Farmer"
            value={role}
            onChange={setRole}
          />

          <Input
            id="location"
            label="Location"
            placeholder="Topsy-Turvy"
            value={loc}
            onChange={setLoc}
          />

          {/* Do a dropdown for this one */}
          <Dropdown
            id="experience"
            label="Years of experience"
            value={experience}
            onChange={setExperience}
            options={[
              { value: "0", label: "None" },
              { value: "1", label: "1 year" },
              { value: "over 2", label: "> 2 years" },
              { value: "over 5", label: "> 5 years" },
              { value: "over 10", label: "> 10 years" },
            ]}
          />

          {/* Do custom textarea */}
          <TextArea
            id="bio"
            label={`About ${username.trim().split(" ")[0]}`}
            placeholder="Here, on the brink of the Martian frontier, I dream of forging a new path for humanity."
            value={biog}
            onChange={setBiog}
            span="Write a few sentences to describe your values and goals."
          />

          {/* Make a disabled input */}
          <DisabledInput
            id="email"
            label="Email address"
            value={email}
            disabled={true}
            span="You cannot modify your email address"
          />
        </div>
      </section>

      <hr className="w-11/12 border-[1px] self-center border-neutral-800" />

      <section className="flex flex-col gap-6 pb-2 sm:flex-row sm:gap-8">
        <div className="flex flex-col gap-1 sm:max-w-[30%]">
          <h3 className="font-mono font-semibold text-neutral-100 text-lg sm:text-xl">
            Work Experience
          </h3>

          <p className="text-sm text-neutral-300"></p>
        </div>
      </section>
    </div>
  );
}
