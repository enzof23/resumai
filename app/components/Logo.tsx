import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-1 font-mono font-semibold tracking-wide text-lg lg:text-xl bg-gradient-to-b from-slate-50 to-slate-50/70 bg-clip-text text-transparent"
    >
      <Image src="/resumai-logo.ico" alt="" width={32} height={32} />
      resumai
    </Link>
  );
}
