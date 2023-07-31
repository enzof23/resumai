"use client";
import { FormEvent } from "react";
import { HalfCircleSpinner } from "react-epic-spinners";

import {
  DateInput,
  Input,
  InputWrapper,
  TextArea,
} from "@/app/components/Inputs";

import type { EXPERIENCE } from "@/lib/database.types";

type SetString = React.Dispatch<React.SetStateAction<string>>;

type FormWrapperProps = {
  showForm: boolean;
  children: React.ReactNode;
  onCancel: () => void;
  onSave?: (e: FormEvent) => Promise<void>;
  onEdit?: (e: FormEvent, exp: EXPERIENCE) => Promise<void>;
  onDelete?: () => Promise<void>;
  isSaving: boolean;
  isDeleting?: boolean;
  isEdit?: boolean;
  experience?: EXPERIENCE;
};

type ExpFormProps = {
  company: string;
  setCompany: SetString;
  role: string;
  setRole: SetString;
  start: string;
  setStart: SetString;
  end: string;
  setEnd: SetString;
  current: boolean;
  handleCheckbox: () => void;
  description: string;
  setDescription: SetString;
};

export function FormWrapper(props: FormWrapperProps) {
  return (
    <form
      onSubmit={(e) => {
        if (props.isEdit && props.experience)
          props.onEdit && props.onEdit(e, props.experience);
        else props.onSave && props.onSave(e);
      }}
      className={`flex flex-col gap-y-4 bg-neutral-900 rounded-sm border border-neutral-800 p-3 ${
        !props.showForm && "hidden"
      }`}
    >
      {props.children}

      <div className="flex gap-4 self-end items-center text-sm">
        {props.isEdit && (
          <button
            type="button"
            onClick={props.onDelete}
            className="font-mono font-semibold text-neutral-400 underline mr-2"
            disabled={props.isSaving}
          >
            {props.isDeleting ? (
              <HalfCircleSpinner size={16} />
            ) : (
              "Remove position"
            )}
          </button>
        )}
        <button
          type="button"
          onClick={props.onCancel}
          className="uppercase font-mono font-semibold text-red-600"
          disabled={props.isSaving}
        >
          cancel
        </button>
        <button
          type="submit"
          className="grid place-items-center uppercase font-mono font-semibold text-neutral-100 border rounded-sm px-2 min-w-[50px] h-6"
        >
          {props.isSaving ? <HalfCircleSpinner size={16} /> : "save"}
        </button>
      </div>
    </form>
  );
}

export function ExperienceForm(props: ExpFormProps) {
  return (
    <>
      <Input
        id="company"
        label="Company*"
        type="text"
        placeholder="Meteorix Marketing"
        value={props.company}
        onChange={props.setCompany}
        required={true}
      />

      <Input
        id="role"
        label="Position*"
        type="text"
        placeholder="Cosmic Marketing Strategist"
        value={props.role}
        onChange={props.setRole}
        required={true}
      />

      <DateInput
        id="start"
        label="Start date*"
        value={props.start}
        onChange={props.setStart}
        required={true}
      />

      <InputWrapper id="end" label="End date*">
        {!props.current && (
          <DateInput
            id="end"
            value={props.end}
            onChange={props.setEnd}
            required={true}
          />
        )}

        <label className="flex gap-x-2">
          <input
            type="checkbox"
            checked={props.current}
            onChange={props.handleCheckbox}
          />
          I currently work here
        </label>
      </InputWrapper>

      <TextArea
        id="description"
        label="Description"
        type="text"
        placeholder="Mapping out stellar marketing campaigns, harnessing the power of the cosmos to propel brands to astronomical success..."
        value={props.description}
        onChange={props.setDescription}
        required={false}
        span="Optional: briefly describe your responsibilities in this role"
      />
    </>
  );
}
