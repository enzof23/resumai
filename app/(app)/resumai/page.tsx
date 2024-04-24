import Form from "./Form";
import Result from "./Result";

export default async function ResumaiPage() {
  return (
    <div className="mx-auto flex flex-col items-center py-4 gap-6 sm:py-8 lg:w-full lg:grid lg:grid-cols-[max-content,_1fr] lg:items-start">
      <div className="flex flex-col gap-4 md:max-w-lg lg:max-w-md sm:gap-6">
        <h1 className="text-slate-200 text-pretty text-3xl sm:text-4xl font-bold tracking-tighter">
          What job are we applying for today ?
        </h1>

        <Form />
      </div>

      <Result />
    </div>
  );
}
