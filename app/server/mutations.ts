"use server";

import { createClient } from "@/utils/supabase/server";

export async function deleteTask(id: string) {
  const supabase = createClient();

  console.log(id);

  const { data, error } = await supabase
    .from("tasks")
    .update({ deleted: true })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
  }
  console.log(data);

  return data;
}
