import { supabaseServer } from "@/supabase/server-client";
import ProfileProvider from "@/supabase/tables/profiles";
import ExperienceProvider from "@/supabase/tables/experiences";
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

  // const auth_id = session && session.user.id;

  // const { data: profiles_data, error } = await supabase
  //   .from("profiles")
  //   .select("*")
  //   .eq("auth_id", auth_id);

  // if (!profiles_data || error)
  //   throw new Error("Couldn't retrieve user's profile from supabase");

  // const { data: experience_data, error: err } = await supabase
  //   .from("experience")
  //   .select("*")
  //   .eq("auth_id", auth_id);

  // if (!experience_data || err)
  //   throw new Error("Couldn't retrieve user's experience from supabase");

  // return (
  //   <main className="flex min-h-screen">
  //     <NavigationBar session={session} />

  //     <ProfileProvider profile={profiles_data[0]} auth_id={auth_id}>
  //       <ExperienceProvider experience={experience_data} auth_id={auth_id}>
  //         <div className="grid min-h-screen place-items-center px-4 pb-4 pt-12 md:px-8 md:pb-6 md:pt-[60px]">
  //           {children}
  //         </div>
  //       </ExperienceProvider>
  //     </ProfileProvider>
  //   </main>
  // );

  return (
    <>
      <NavigationBar session={session} />

      <main className="flex min-h-screen pt-14 pb-4 px-4 sm:px-6 lg:ml-56 lg:p-6">
        {children}
      </main>
    </>
  );
}
