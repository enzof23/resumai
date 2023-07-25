import { cookies } from "next/headers";
import {
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";

import type { Database } from "@/lib/database.types";

export const supabaseServer = () =>
  createServerComponentClient<Database>({ cookies });

export const supabaseActions = () =>
  createServerActionClient<Database>({ cookies });
