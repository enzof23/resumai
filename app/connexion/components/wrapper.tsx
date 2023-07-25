export default function FormWrapper(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-y-2 md:gap-y-4 border-[2px] w-full max-w-md border-neutral-200 bg-neutral-800/50 rounded-lg p-4 md:py-6 md:px-5">
      {props.children}
    </div>
  );
}
