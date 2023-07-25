import Logo from "../components/Logo";

export default function ConnexionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-4 lg:flex-row min-h-screen">
      {/* Left Col */}
      <div className="px-5 py-3 sm:py-4 lg:flex-1 flex flex-col gap-y-3 md:gap-y-6">
        <div className="flex">
          <Logo />
        </div>

        <div className="flex-1 flex flex-col justify-center gap-y-3 md:gap-y-6 lg:gap-y-10 md:pl-6">
          <h3 className="group text-3xl md:text-5xl max-w-[18ch] font-inter bg-gradient-to-b from-neutral-50 to-neutral-50/60 bg-clip-text text-transparent font-bold tracking-tighter">
            Unlock Your Career Potential with AI-Powered Cover Letters!
          </h3>

          <p className="text-xs max-w-lg sm:text-sm lg:text-base text-neutral-200 font-light font-mono tracking-tight leading-4">
            Join us today to experience the power of AI in crafting personalized
            cover letters that elevate your job applications to new heights.{" "}
            <br /> <br /> Log in or create an account to get started on your
            journey to career success.
          </p>
        </div>
      </div>

      {/* Right Col */}
      <div className="flex-1 p-4 md:p-6 flex flex-col md:grid md:place-items-center">
        {children}
      </div>
    </div>
  );
}
