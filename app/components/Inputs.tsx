import { ChangeEvent, Dispatch, SetStateAction } from "react";

type BaseProps = {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
};

type InputProps = {
  onChange: Dispatch<SetStateAction<string>>;
} & BaseProps;

type TextAreaProps = {
  onChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
} & BaseProps;

function InputWrapper(props: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-y-1 w-full">{props.children}</div>;
}

function InputLabel(props: { id: string; label: string }) {
  return (
    <label
      htmlFor={props.id}
      className="font-semibold leading-7 text-primary-20"
    >
      {props.label}
    </label>
  );
}

export function Input({ ...props }: InputProps) {
  return (
    <InputWrapper>
      <InputLabel id={props.id} label={props.label} />

      <input
        id={props.id}
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        required={props.required}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        className="bg-neutral-900 outline-none duration-300 placeholder:text-sm md:placeholder:text-base px-2 rounded-lg w-full py-2 md:px-3 font-mono text-neutral-100 border-2 border-neutral-600 placeholder:text-neutral-600"
        onFocus={(event) => event.target.classList.add("gradient-outline")}
        onBlur={(event) => event.target.classList.remove("gradient-outline")}
      />
    </InputWrapper>
  );
}

export function TextArea({ ...props }: TextAreaProps) {
  return (
    <InputWrapper>
      <InputLabel id={props.id} label={props.label} />

      <textarea
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        required={props.required}
        onChange={props.onChange}
        className="bg-neutral-900 min-h-[20ch] resize-none outline-none duration-300 placeholder:text-sm md:placeholder:text-base px-2 rounded-lg w-full py-2 md:px-3 font-mono text-neutral-100 border-2 border-neutral-600 placeholder:text-neutral-600"
        onFocus={(event) => event.target.classList.add("gradient-outline")}
        onBlur={(event) => event.target.classList.remove("gradient-outline")}
      />
    </InputWrapper>
  );
}
