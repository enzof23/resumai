import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="font-mono font-semibold tracking-wide text-lg lg:text-xl bg-gradient-to-b from-neutral-50 to-neutral-50/70 bg-clip-text text-transparent"
    >
      resumai
    </Link>
  );
}
