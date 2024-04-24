type WrapperProps = {
  children: React.ReactNode;
  name: string;
  label?: string;
};

type InputProps = {
  name: string;
  placeholder: string;
  disabled?: boolean;
};

export function InputWrapper(props: WrapperProps) {
  return (
    <div className="flex flex-col gap-y-1 w-full h-full">
      {props.label && (
        <label
          htmlFor={props.name}
          className="font-semibold capitalize leading-5 text-slate-200"
        >
          {props.label}
        </label>
      )}

      {props.children}
    </div>
  );
}

export function Input(props: InputProps) {
  return (
    <input
      required
      type="text"
      className="input"
      name={props.name}
      placeholder={props.placeholder}
      onFocus={(event) => event.target.classList.add("gradient-outline")}
      onBlur={(event) => event.target.classList.remove("gradient-outline")}
    />
  );
}

export function TextArea(props: InputProps) {
  return (
    <textarea
      required
      className="input min-h-[20ch] resize-none"
      name={props.name}
      placeholder={props.placeholder}
      onFocus={(event) => event.target.classList.add("gradient-outline")}
      onBlur={(event) => event.target.classList.remove("gradient-outline")}
    />
  );
}
