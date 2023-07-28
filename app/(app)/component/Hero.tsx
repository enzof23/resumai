export default function Hero() {
  return (
    <div className="flex flex-col gap-y-1 md:items-center md:text-center">
      <h1 className="py-2 text-3xl font-inter font-bold tracking-tighter bg-gradient-to-b from-neutral-50 to-neutral-50/50 bg-clip-text text-transparent sm:text-5xl md:text-6xl">
        Get your dream job with{" "}
        <span className="font-mono underline decoration-neutral-400 decoration-[3px]">
          resumai
        </span>
      </h1>

      <p className="font-inter text-sm font-light leading-4 text-neutral-400 max-w-[65ch] md:text-base md:leading-5">
        Welcome to the future of cover letters - where AI empowers you to create
        compelling and tailored cover letters for any job offer effortlessly
      </p>
    </div>
  );
}
