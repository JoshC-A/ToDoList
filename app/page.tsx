"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "./types/task.type";
import { DataTable } from "./components/DataTable";
import { mockData } from "./temp-data/columns";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const updateCompleted = (row: Partial<Task>) => {
  // Place holder to update tasks completed status
};

const columns: ColumnDef<Partial<Task>>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  {
    // Custom cell for date
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const dateString: string = row.getValue("created_at");

      const formatted = new Date(dateString).toDateString();

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "completed",
    header: "Completed",
    cell: ({ row }) => {
      const isCompleted: boolean = row.getValue("completed");

      return (
        <div>
          <Checkbox
            checked={isCompleted}
            onCheckedChange={() => updateCompleted(row)}
          />
        </div>
      );
    },
  },
];

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Welcome {data.user.email}
      </h1>
      <DataTable columns={columns} data={mockData} />
    </div>
  );
}
