"use client";

import { useEffect, useState, FormEvent } from "react";
import { BsPlus } from "react-icons/bs";
import { supabaseClient } from "@/supabase/client";

import { useProfiles } from "@/supabase/tables/profiles";
import { useExperience } from "@/supabase/tables/experiences";

import { InputContainer } from "./InputContainer";
import { FormWrapper, ExperienceForm } from "./forms";
import {
  DisabledInput,
  Dropdown,
  Input,
  TextArea,
} from "@/app/components/Inputs";

import type { EXPERIENCE } from "@/lib/database.types";

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
        <h3 className="font-mono font-semibold text-slate-100 text-lg sm:text-xl">
          Tell us about yourself
        </h3>

        <p className="text-sm text-slate-300">
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
  const [editExperience, setEditExperience] = useState<string>("");

  const [company, setCompany] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [current, setCurrent] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

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

  // onClick for NewExperience form save button => inserts new row in "experiences" table
  async function saveExperience(e: FormEvent) {
    e.preventDefault();
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
      setIsSaving(false);
    } catch (error) {
      setIsSaving(false);
    }
  }

  // sets states for onClick "Edit" button in experience section
  function onEditExperience(exp: EXPERIENCE) {
    setAddExperience(false);

    setCompany(exp.company);
    setRole(exp.role);
    setStart(exp.start_date);
    setDescription(exp.description ?? "");

    if (exp.end_date === "current") {
      setCurrent(true);
    } else {
      setEnd(exp.end_date);
    }
  }

  // onClick for Experience form save button => updates modified values in "experiences" table row
  async function updateExperience(event: FormEvent, exp: EXPERIENCE) {
    event.preventDefault();

    try {
      setIsSaving(true);
      const supabase = supabaseClient();

      if (company !== exp.company) {
        await supabase
          .from("experience")
          .update({ company })
          .eq("experience_id", exp.experience_id);
      }

      if (role !== exp.role) {
        await supabase
          .from("experience")
          .update({ role })
          .eq("experience_id", exp.experience_id);
      }

      if (start !== exp.start_date) {
        await supabase
          .from("experience")
          .update({ start_date: start })
          .eq("experience_id", exp.experience_id);
      }

      if (end !== exp.end_date) {
        const end_date = end === "" ? "current" : end;
        await supabase
          .from("experience")
          .update({ end_date })
          .eq("experience_id", exp.experience_id);
      }

      if (description !== exp.description) {
        await supabase
          .from("experience")
          .update({ description })
          .eq("experience_id", exp.experience_id);
      }

      setIsSaving(false);
      setEditExperience("");
      resetExperience();
    } catch (error) {
      setIsSaving(false);
      console.log(error);
    }
  }

  // onClick for "remove position" button => delete row in "experiences" table
  async function deleteExperience(id: string) {
    try {
      setIsDeleting(true);
      const supabase = supabaseClient();

      await supabase.from("experience").delete().eq("experience_id", id);

      setIsDeleting(false);
    } catch (error) {
      setIsDeleting(false);
      console.log(error);
    }
  }

  // onClick for "cancel" button => resets form states
  function resetExperience() {
    setAddExperience(false);
    setCompany("");
    setRole("");
    setStart("");
    setEnd("");
    setCurrent(false);
    setDescription("");
  }

  // sort experiences from most recent to oldest
  function sortExperiences(experiences: EXPERIENCE[]) {
    experiences.sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);

      // Compare the dates and return the appropriate value
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      } else {
        return 0;
      }
    });

    return experiences;
  }

  // listens to "edit" button click and
  useEffect(() => {
    const exp = user_experience.filter(
      (x) => x.experience_id === editExperience
    );

    if (exp.length > 0) {
      onEditExperience(exp[0]);
    }
  }, [editExperience, user_experience]);

  return (
    <SectionWrapper>
      <div className="flex flex-col gap-1 w-full sm:max-w-[30%]">
        <h3 className="font-mono font-semibold text-slate-100 text-lg sm:text-xl">
          Work Experience
        </h3>

        <p className="text-sm text-slate-300"></p>
      </div>

      <div className="flex flex-col flex-1 gap-y-4">
        {sortExperiences(user_experience).map((exp) => {
          // If user clicked edit, display form instead of experience display div
          if (editExperience === exp.experience_id) {
            return (
              <FormWrapper
                key={exp.experience_id}
                showForm={true}
                onCancel={() => {
                  setEditExperience("");
                  resetExperience();
                }}
                onEdit={updateExperience}
                onDelete={() => deleteExperience(exp.experience_id)}
                isSaving={isSaving}
                isEdit={true}
                isDeleting={isDeleting}
                experience={exp}
              >
                <ExperienceForm
                  company={company}
                  setCompany={setCompany}
                  role={role}
                  setRole={setRole}
                  start={start}
                  setStart={setStart}
                  end={end}
                  setEnd={setEnd}
                  current={current}
                  handleCheckbox={handleCheckbox}
                  description={description ?? ""}
                  setDescription={setDescription}
                />
              </FormWrapper>
            );
          }

          return (
            // default experience display
            <div
              key={exp.experience_id}
              className="flex flex-col gap-y-2 border rounded-sm border-slate-500 leading-5 p-3 bg-slate-900 sm:pl-5 sm:p-4"
            >
              <div className="flex flex-col">
                <div className="flex flex-1 justify-between items-center">
                  <h4 className="font-semibold font-mono tracking-tight sm:leading-5 sm:text-lg">
                    {exp.role}
                  </h4>
                  <button
                    onClick={() => setEditExperience(exp.experience_id)}
                    className="text-sm text-slate-300 h-fit"
                  >
                    Edit
                  </button>
                </div>

                <p className="text-sm font-semibold text-slate-300 sm:text-base">
                  {exp.company}
                </p>
                <p className="text-sm font-light text-slate-400">
                  {exp.start_date} to{" "}
                  {exp.end_date === "current" ? "Present" : exp.end_date}
                </p>
              </div>

              <p className="text-slate-200 font-light">{exp.description}</p>
            </div>
          );
        })}

        {/* NewExperienceForm hidden default */}
        <FormWrapper
          showForm={addExperience}
          onCancel={resetExperience}
          onSave={saveExperience}
          isSaving={isSaving}
        >
          <ExperienceForm
            company={company}
            setCompany={setCompany}
            role={role}
            setRole={setRole}
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
            current={current}
            handleCheckbox={handleCheckbox}
            description={description}
            setDescription={setDescription}
          />
        </FormWrapper>

        {/* Button reveal form */}
        <button
          className={`flex items-center w-fit ${addExperience && "hidden"}`}
          onClick={() => {
            resetExperience();
            setEditExperience("");
            setAddExperience(true);
          }}
        >
          <BsPlus className="text-xl" />
          Add work experience
        </button>
      </div>
    </SectionWrapper>
  );
}
