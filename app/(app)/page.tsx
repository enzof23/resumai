import { supabaseServer } from "@/supabase/server-client";
import Main from "./component/main";

export default async function Home() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  return (
    <div className="flex flex-col h-full gap-y-6 md:gap-y-16 pt-4 md:pt-12">
      <Main session={session} />
    </div>
  );
}
