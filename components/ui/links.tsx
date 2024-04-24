"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsChevronRight } from "react-icons/bs";

interface NavLinks {
  href: string;
  text: string;
  icon?: JSX.Element;
}

// Links to navigate to sign up or log in
export function ConnexionLink(props: NavLinks) {
  const { text, href } = props;

  return (
    <Link
      href={href}
      className={`group flex items-center justify-between sm:justify-center lg:justify-between
                  py-2 px-3 w-full sm:min-w-[77px] lg:py-3 lg:px-5
                bg-slate-800 rounded-full text-sm leading-4 text-slate-300 font-medium capitalize
                  transition-all duration-100 md:hover:text-white md:hover:bg-slate-700`}
    >
      <p className="lg:translate-x-2 lg:group-hover:translate-x-0 transition-all duration-300">
        {text}
      </p>
      <div className="inline sm:hidden lg:inline lg:opacity-0 lg:translate-x-[-12px] lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all duration-300">
        <BsChevronRight />
      </div>
    </Link>
  );
}

// Sidebar links for route navigation
export function NavigationLink(props: NavLinks) {
  const { text, href, icon } = props;
  const pathname = usePathname();
  const activeRoute = pathname === href;

  const backgroundColor = activeRoute && "bg-slate-600 lg:bg-slate-800";
  const textColor = activeRoute ? "text-white" : "text-slate-400";
  const LinkHoverEffect =
    !activeRoute && "md:hover:text-white md:hover:bg-slate-800";
  const TextHoverEffect = !activeRoute && "lg:group-hover:translate-x-0";

  return (
    <Link
      href={href}
      className={`group flex items-center justify-center lg:justify-between
                  py-2 pl-3 pr-4 sm:px-3 lg:p-3
                  rounded-full w-fit sm:w-full font-medium capitalize
                  ${backgroundColor} ${textColor} ${LinkHoverEffect}`}
    >
      <div
        className={`flex gap-1 lg:gap-2 items-center lg:translate-x-2 transition-all duration-300 ${TextHoverEffect}`}
      >
        {icon}
        <p className="text-sm leading-4">{text}</p>
      </div>

      {!activeRoute && (
        <div className="hidden lg:inline lg:opacity-0 lg:translate-x-[-12px] lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all duration-300">
          <BsChevronRight />
        </div>
      )}
    </Link>
  );
}
