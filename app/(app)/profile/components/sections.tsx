"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/supabase/client";

import { useProfiles } from "@/supabase/tables/profiles";
import { useExperience } from "@/supabase/tables/experiences";

import { BsPlus } from "react-icons/bs";
import { InputContainer } from "./InputContainer";
import {
  DateInput,
  DisabledInput,
  Dropdown,
  Input,
  InputWrapper,
  TextArea,
} from "@/app/components/Inputs";
import { HalfCircleSpinner } from "react-epic-spinners";

function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6 sm:flex-row sm:gap-8">
      {children}
    </section>
  );
}

export type Target = "name" | "role" | "location" | "experience" | "biog";

export type UpdatesParams = {
  type: "cancel" | "save";
  target: Target;
};

export function ProfileSection() {
  const {
    user_profile: {
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

  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (username !== full_name) setNameUpd(true);
    if (username === full_name) setNameUpd(false);
  }, [username, full_name]);

  useEffect(() => {
    if (role !== primary_role) setRoleUpd(true);
    if (role === primary_role) setRoleUpd(false);
  }, [role, primary_role]);

  useEffect(() => {
    if (loc !== location) setLocUpd(true);
    if (loc === location) setLocUpd(false);
  }, [loc, location]);

  useEffect(() => {
    if (experience !== years_experience) setExperienceUpd(true);
    if (experience === years_experience) setExperienceUpd(false);
  }, [experience, years_experience]);

  useEffect(() => {
    if (biog !== bio) setBiogUpd(true);
    if (biog === bio) setBiogUpd(false);
  }, [biog, bio]);

  async function handleUpdates(params: UpdatesParams) {
    const { type, target } = params;

    if (type === "save") await saveUpdates(target);

    if (type === "cancel") {
      switch (target) {
        case "name":
          setUsername(full_name);
          break;

        case "role":
          setRole(primary_role);
          break;

        case "location":
          setLoc(location);
          break;

        case "experience":
          setExperience(years_experience);
          break;

        case "biog":
          setBiog(bio);
          break;

        default:
          break;
      }
    }
  }

  async function saveUpdates(target: Target) {
    const supabase = supabaseClient();
    setIsSaving(true);

    switch (target) {
      case "name":
        await supabase
          .from("profiles")
          .update({ full_name: username })
          .eq("profile_id", profile_id);
        setIsSaving(false);
        break;

      case "role":
        await supabase
          .from("profiles")
          .update({ primary_role: role })
          .eq("profile_id", profile_id);
        setIsSaving(false);
        break;

      case "location":
        await supabase
          .from("profiles")
          .update({ location: loc })
          .eq("profile_id", profile_id);
        setIsSaving(false);
        break;

      case "experience":
        await supabase
          .from("profiles")
          .update({ years_experience: experience })
          .eq("profile_id", profile_id);
        setIsSaving(false);
        break;

      case "biog":
        await supabase
          .from("profiles")
          .update({ bio: biog })
          .eq("profile_id", profile_id);
        setIsSaving(false);
        break;

      default:
        break;
    }
  }

  return (
    <SectionWrapper>
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
        <InputContainer
          target="name"
          isUpdated={nameUpd}
          isSaving={isSaving}
          handleUpdates={handleUpdates}
        >
          <Input
            id="name"
            label="Full name"
            value={username}
            onChange={setUsername}
          />
        </InputContainer>

        <InputContainer
          target="role"
          isUpdated={roleUpd}
          isSaving={isSaving}
          handleUpdates={handleUpdates}
        >
          <Input
            id="role"
            label="Primary role"
            placeholder="Cosmic Potato Farmer"
            value={role}
            onChange={setRole}
          />
        </InputContainer>

        <InputContainer
          target="location"
          isUpdated={locUpd}
          isSaving={isSaving}
          handleUpdates={handleUpdates}
        >
          <Input
            id="location"
            label="Location"
            placeholder="Topsy-Turvy"
            value={loc}
            onChange={setLoc}
          />
        </InputContainer>

        <InputContainer
          target="experience"
          isUpdated={experienceUpd}
          isSaving={isSaving}
          handleUpdates={handleUpdates}
        >
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
        </InputContainer>

        <InputContainer
          target="biog"
          isUpdated={biogUpd}
          isSaving={isSaving}
          handleUpdates={handleUpdates}
        >
          <TextArea
            id="bio"
            label={`About ${username.trim().split(" ")[0]}`}
            placeholder="Here, on the brink of the Martian frontier, I dream of forging a new path for humanity."
            value={biog}
            onChange={setBiog}
            span="Write a few sentences to describe your values and goals."
          />
        </InputContainer>

        <DisabledInput
          id="email"
          label="Email address"
          value={email}
          disabled={true}
          span="You cannot modify your email address"
        />
      </div>
    </SectionWrapper>
  );
}

export function WorkExperienceSection() {
  const { user_experience } = useExperience();
  const {
    user_profile: { profile_id, auth_id },
  } = useProfiles();

  const [addExperience, setAddExperience] = useState<boolean>(false);

  const [company, setCompany] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [current, setCurrent] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const [isSaving, setIsSaving] = useState<boolean>(false);

  function handleCheckbox() {
    if (current) {
      setCurrent(false);
      setEnd("");
    }
    if (!current) {
      setCurrent(true);
      setEnd("current");
    }
  }

  async function saveExperience() {
    try {
      const supabase = supabaseClient();
      setIsSaving(true);
      await supabase.from("experience").insert({
        company,
        profile_id,
        role,
        start_date: start,
        end_date: end,
        description,
        auth_id,
      });

      resetExperience();
    } catch (error) {
      setIsSaving(false);
    }
  }

  function resetExperience() {
    setAddExperience(false);
    setCompany("");
    setRole("");
    setStart("");
    setEnd("");
    setCurrent(false);
    setDescription("");
  }

  return (
    <SectionWrapper>
      <div className="flex flex-col gap-1 w-full sm:max-w-[30%]">
        <h3 className="font-mono font-semibold text-neutral-100 text-lg sm:text-xl">
          Work Experience
        </h3>

        <p className="text-sm text-neutral-300"></p>
      </div>

      <div className="flex flex-col flex-1 gap-y-4">
        {user_experience.map((exp) => {
          return <p key={exp.experience_id}>{exp.role}</p>;
        })}

        {/* Form hidden default */}
        <div
          className={`flex flex-col gap-y-4 bg-neutral-900 rounded-sm border border-neutral-800 p-3 ${
            !addExperience && "hidden"
          }`}
        >
          <Input
            id="company"
            label="Company*"
            type="text"
            placeholder="Meteorix Marketing"
            value={company}
            onChange={setCompany}
            required={true}
          />

          <Input
            id="role"
            label="Position*"
            type="text"
            placeholder="Cosmic Marketing Strategist"
            value={role}
            onChange={setRole}
            required={true}
          />

          <DateInput
            id="start"
            label="Start date*"
            value={start}
            onChange={setStart}
            required={true}
          />

          <InputWrapper id="end" label="End date*">
            {!current && (
              <DateInput
                id="end"
                value={end}
                onChange={setEnd}
                required={true}
              />
            )}

            <label className="flex gap-x-2">
              <input
                type="checkbox"
                checked={current}
                onChange={handleCheckbox}
              />
              I currently work here
            </label>
          </InputWrapper>

          <TextArea
            id="description"
            label="Description"
            type="text"
            placeholder="Mapping out stellar marketing campaigns, harnessing the power of the cosmos to propel brands to astronomical success..."
            value={description}
            onChange={setDescription}
            required={false}
            span="Optional: briefly describe your responsibilities in this role"
          />

          <div className="flex gap-4 self-end text-sm">
            <button
              onClick={resetExperience}
              className="uppercase font-mono font-semibold text-red-600"
              disabled={isSaving}
            >
              cancel
            </button>
            <button
              onClick={saveExperience}
              className="grid place-items-center uppercase font-mono font-semibold text-neutral-100 border rounded-sm px-2 min-w-[50px] h-6"
            >
              {isSaving ? <HalfCircleSpinner size={16} /> : "save"}
            </button>
          </div>
        </div>

        {/* Button reveal form */}
        <button
          className={`flex items-center w-fit ${addExperience && "hidden"}`}
          onClick={() => setAddExperience(true)}
        >
          <BsPlus className="text-xl" />
          Add work experience
        </button>
      </div>
    </SectionWrapper>
  );
}
