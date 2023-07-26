export default function Hero() {
  return (
    <div className="flex flex-col gap-y-1 md:items-center md:text-center">
      <h1 className="group text-3xl sm:text-5xl font-inter bg-gradient-to-b from-neutral-50 to-neutral-50/50 bg-clip-text text-transparent font-bold md:text-6xl tracking-tighter py-2">
        Get your dream job with{" "}
        <span className="font-bold underline decoration-neutral-400 font-mono decoration-[3px]">
          resumai
        </span>
      </h1>

      <p className="font-inter md:text-base text-neutral-400 max-w-[65ch] font-light md:leading-5 text-sm leading-4">
        Welcome to the future of cover letters - where AI empowers you to create
        compelling and tailored cover letters for any job offer effortlessly
      </p>
    </div>
  );
}
