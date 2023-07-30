import { ChangeEvent, Dispatch, SetStateAction } from "react";

type BaseProps = {
  id: string;
  type?: "text" | "email" | "password";
  label?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  span?: string;
  isError?: boolean;
};

type WrapperProps = {
  children: React.ReactNode;
  id: string;
  label?: string;
};

type SpanProps = {
  span: string;
  isError?: boolean;
};

type InputProps = {
  onChange?: Dispatch<SetStateAction<string>>;
} & BaseProps;

type JobDescriptionProps = {
  onChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
} & BaseProps;

type Option = {
  value: string;
  label: string;
};

type DropdownProps = {
  onChange?: Dispatch<SetStateAction<string>>;
  options: Option[];
} & BaseProps;

export function InputWrapper(props: WrapperProps) {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      {/* Label */}
      {props.label && (
        <label
          htmlFor={props.id}
          className="font-semibold capitalize leading-7 text-primary-20"
        >
          {props.label}
        </label>
      )}

      {props.children}
    </div>
  );
}

function InputSpan(props: SpanProps) {
  return (
    <span
      className={`text-sm ${
        props.isError ? "text-red-400" : "text-neutral-500"
      }`}
    >
      {props.span}
    </span>
  );
}

const baseStyles =
  "font-mono bg-neutral-900 px-2 py-2 w-full outline-none border-2 rounded-lg md:px-3";

const inputStyles =
  "text-neutral-100 border-neutral-600 duration-300 placeholder:text-sm placeholder:text-neutral-600 md:placeholder:text-base";

export function Input({ ...props }: InputProps) {
  return (
    <InputWrapper id={props.id} label={props.label}>
      <input
        id={props.id}
        name={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        required={props.required}
        onChange={(e) =>
          props.onChange && props.onChange(e.currentTarget.value)
        }
        className={`${baseStyles} ${inputStyles}`}
        onFocus={(event) => event.target.classList.add("gradient-outline")}
        onBlur={(event) => event.target.classList.remove("gradient-outline")}
      />

      {props.span && <InputSpan span={props.span} isError={props.isError} />}
    </InputWrapper>
  );
}

const date = new Date();

export const today = `${date.getFullYear()}-${
  date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
}`;

console.log(today);

export function DateInput({ ...props }: InputProps) {
  return (
    <InputWrapper id={props.id} label={props.label}>
      <input
        id={props.id}
        name={props.id}
        type="month"
        value={props.value}
        required={props.required}
        onChange={(e) =>
          props.onChange && props.onChange(e.currentTarget.value)
        }
        className={`${baseStyles} ${inputStyles}`}
        min={"1950-01"}
        max={today}
      />

      {props.span && <InputSpan span={props.span} isError={props.isError} />}
    </InputWrapper>
  );
}

export function TextArea({ ...props }: InputProps) {
  return (
    <InputWrapper id={props.id} label={props.label}>
      {props.span && <InputSpan span={props.span} isError={props.isError} />}

      <textarea
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        required={props.required}
        onChange={(e) =>
          props.onChange && props.onChange(e.currentTarget.value)
        }
        className={`${baseStyles} ${inputStyles} min-h-[15ch] resize-y`}
        onFocus={(event) => event.target.classList.add("gradient-outline")}
        onBlur={(event) => event.target.classList.remove("gradient-outline")}
      />
    </InputWrapper>
  );
}

export function Dropdown({ ...props }: DropdownProps) {
  return (
    <InputWrapper id={props.id} label={props.label}>
      <select
        id={props.id}
        name={props.id}
        value={props.value}
        required={props.required}
        onChange={(e) =>
          props.onChange && props.onChange(e.currentTarget.value)
        }
        className={`${baseStyles} ${inputStyles}`}
        onFocus={(event) => event.target.classList.add("gradient-outline")}
        onBlur={(event) => event.target.classList.remove("gradient-outline")}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {props.span && <InputSpan span={props.span} isError={props.isError} />}
    </InputWrapper>
  );
}

export function DisabledInput({ ...props }: InputProps) {
  return (
    <InputWrapper id={props.id} label={props.label}>
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        disabled={true}
        className={`${baseStyles} text-neutral-500  border-neutral-800`}
      />

      {props.span && <InputSpan span={props.span} isError={props.isError} />}
    </InputWrapper>
  );
}

export function JobDescriptionInput({ ...props }: JobDescriptionProps) {
  return (
    <InputWrapper id={props.id} label={props.label}>
      <textarea
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        required={props.required}
        onChange={props.onChange}
        className={`${baseStyles} ${inputStyles} min-h-[20ch] resize-none`}
        onFocus={(event) => event.target.classList.add("gradient-outline")}
        onBlur={(event) => event.target.classList.remove("gradient-outline")}
      />
    </InputWrapper>
  );
}
