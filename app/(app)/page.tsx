import { supabaseServer } from "@/supabase/server-client";
import Main from "./components/_main";

export default async function Home() {
  const supabase = supabaseServer();

  const { data } = await supabase.auth.getSession();
  const { session } = data;

  return (
    <div className="flex flex-col h-full gap-y-6 md:gap-y-16 py-4 md:pt-12">
      <Main session={session} />
    </div>
  );
}
