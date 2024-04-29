"use server";

import { createClient } from "@/utils/supabase/server";
import { createServerClient } from "@supabase/ssr";

export async function getUserData() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return { data, error };
}
