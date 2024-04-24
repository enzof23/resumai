import { supabaseServer } from "@/supabase/server-client";
import NavigationBar from "@/components/navs";

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
      <NavigationBar session={session} />

      <main className="flex min-h-screen pt-14 pb-4 px-4 sm:px-6 lg:ml-56 lg:p-6">
        {children}
      </main>
    </>
  );
}
