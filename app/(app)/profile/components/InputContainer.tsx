"use client";

import { HalfCircleSpinner } from "react-epic-spinners";
import { Target, UpdatesParams } from "./sections";

type ContainerProps = {
  children: React.ReactNode;
  target: Target;
  isUpdated: boolean;
  isSaving: boolean;
  handleUpdates: (params: UpdatesParams) => Promise<void>;
};

export function InputContainer({ ...props }: ContainerProps) {
  return (
    <div className="flex flex-col gap-2">
      {props.children}

      {props.isUpdated && (
        <div className="flex gap-4 self-end text-sm">
          <button
            onClick={() =>
              props.handleUpdates({ type: "cancel", target: props.target })
            }
            className="uppercase font-mono font-semibold text-red-600"
            disabled={props.isSaving}
          >
            cancel
          </button>
          <button
            onClick={() =>
              props.handleUpdates({ type: "save", target: props.target })
            }
            className="grid place-items-center uppercase font-mono font-semibold text-slate-100 border rounded-sm px-2 min-w-[50px] h-6"
          >
            {props.isSaving ? <HalfCircleSpinner size={16} /> : "save"}
          </button>
        </div>
      )}
    </div>
  );
}
