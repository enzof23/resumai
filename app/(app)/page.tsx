import Steps from "@/components/steps";

export default function Home() {
  return (
    <div className="self-center mx-auto flex flex-col items-center gap-6 max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-none sm:gap-12 lg:gap-16 py-6 sm:py-8 lg:py-0">
      {/* Hero Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl pb-1 font-bold tracking-tighter bg-gradient-to-b from-slate-50 to-slate-400/70 bg-clip-text text-transparent">
          Get your dream job with{" "}
          <span className="font-mono underline decoration-slate-400 decoration-[3px]">
            resumai
          </span>
        </h1>

        <p className="text-sm md:text-base md:leading-5 lg:text-lg lg:leading-6 leading-4 text-slate-400/90 max-w-[65ch] lg:max-w-[80ch]">
          Welcome to the future of cover letters - where AI empowers you to
          create compelling and tailored cover letters for any job offer
          effortlessly.
        </p>
      </div>

      {/* Steps Component */}
      <div className="flex flex-col-reverse py-8 px-4 md:px-6 w-full rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 shadow-slate-800 shadow-inner md:grid md:grid-cols-2">
        <Steps />

        <div className="grid place-items-center">
          <div className="bg-slate-300 h-48 w-64">video</div>
        </div>
      </div>
    </div>
  );
}
