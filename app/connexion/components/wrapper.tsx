import Link from "next/link";

export default function FormWrapper(props: {
  children: React.ReactNode;
  title: string;
  link: "login" | "signup";
  error: string | null;
}) {
  const loginCTA = { text: "Not yet registered ?", link: "Create an account" };
  const signupCTA = { text: "Already registered ?", link: "Log in!" };

  return (
    <div className="flex flex-col p-4 gap-y-2 border-[2px] w-full max-w-md border-neutral-200 bg-neutral-800/50 rounded-lg sm:gap-y-4 sm:py-6 sm:px-5">
      <h3 className="text-lg font-mono font-medium text-neutral-50 sm:text-2xl">
        {props.title}
      </h3>

      {/* <button>Continue with Google</button> */}

      {props.children}

      {props.error && (
        <div className="px-3 py-2 text-red-700 font-semibold font-mono rounded-md bg-red-300">
          {props.error}
        </div>
      )}

      <div className="flex flex-col items-center gap-x-1 self-center text-sm mt-2 sm:flex-row">
        <p className="text-neutral-50">
          {props.link === "signup" ? loginCTA.text : signupCTA.text}
        </p>
        <Link
          href={`/connexion?auth=${props.link}`}
          className="md:hover:underline underline md:no-underline font-medium text-white"
        >
          {props.link === "signup" ? loginCTA.link : signupCTA.link}
        </Link>
      </div>
    </div>
  );
}
