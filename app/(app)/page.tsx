import { supabaseServer } from "@/supabase/server-client";

import Main from "./components/_main";
import UnauthMain from "./components/_unauthMain";

export default async function Home() {
  const supabase = supabaseServer();

  const { data } = await supabase.auth.getSession();
  const { session } = data;

  if (!session || !session.user) {
    return (
      <div className="flex flex-col w-full h-full gap-y-6 md:gap-y-16 py-4">
        <UnauthMain />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full gap-y-6 md:gap-y-16 py-4">
      <Main session={session} />
    </div>
  );
}
