import { Resumai } from "@/components/logo";

export default function ConnexionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-4 min-h-screen lg:grid lg:grid-cols-2">
      <div className="flex flex-col p-3 lg:py-4 lg:px-6 gap-y-3 sm:gap-y-6 lg:flex-1 lg:pb-4">
        <Resumai />

        <div className="flex flex-col gap-y-3 lg:gap-y-10 lg:flex-1 lg:justify-center lg:pl-6 xl:pl-[6vw]">
          <h3 className="text-3xl font-inter max-w-[18ch] bg-gradient-to-b from-neutral-50 to-neutral-50/60 bg-clip-text text-transparent font-bold tracking-tighter sm:text-5xl">
            Unlock Your Career Potential with AI-Powered Cover Letters!
          </h3>

          <p className="text-xs font-mono font-light max-w-lg text-neutral-200 tracking-tight leading-4 sm:text-sm lg:text-base">
            Join us today to experience the power of AI in crafting personalized
            cover letters that elevate your job applications to new heights.{" "}
            <br /> <br /> Log in or create an account to get started on your
            journey to career success.
          </p>
        </div>
      </div>

      <div className="grid items-center p-2">{children}</div>
    </div>
  );
}
