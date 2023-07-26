import { supabaseServer } from "@/supabase/server-client";
import { DesktopNavbar, MobileNavbar } from "../components/Navbar";

export const revalidate = 0;

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getSession();
  const { session } = data;

  return (
    <>
      <DesktopNavbar session={session} />
      <MobileNavbar session={session} />

      <div className="grid min-h-screen place-items-center px-4 pb-4 pt-12 md:px-8 md:pb-6 md:pt-[60px]">
        {children}
      </div>
    </>
  );
}
