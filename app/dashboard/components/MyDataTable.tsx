"use server";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/app/types/task.type";
import { DataTable } from "@/app/components/DataTable";
import { mockData } from "@/app/temp-data/columns";
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

      return <div>Checkout</div>;
    },
  },
];
