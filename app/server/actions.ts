import { createClient } from "@/utils/supabase/server";
import { Task } from "../types/task.type";
// import { redirect } from "next/navigation";

export const revalidate = 0;

export async function getTasksByUserId(id: string): Promise<Task[] | null> {
  const supabase = createClient();

  const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("user", id)
    .eq("deleted", false);

  return data;
}

export async function getUsersId(): Promise<string | undefined> {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return data.user?.id;
}
