export default function FormWrapper(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col border border-neutral-800 bg-neutral-800/50 rounded-lg p-3 md:py-4 md:px-3">
      {props.children}
    </div>
  );
}
