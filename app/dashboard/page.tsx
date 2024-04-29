"use client";

// import { DataTable } from "../components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../components/DataTable";
import { mockData } from "../temp-data/columns";
import { Task } from "../types/task.type";
// import { Checkbox } from "@radix-ui/react-checkbox";

import { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
          {/* <Checkbox
            checked={isCompleted}
            onCheckedChange={() => updateCompleted(row)}
          /> */}
        </div>
      );
    },
  },
];

const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>();
  const supabase = createClient();

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.id;
  };

  const getData = async () => {
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("user", await getUser())
      .eq("deleted", false);

    // *** Janky type casting! ***
    setTasks(data as Task[]);
    console.log(data);
  };

  const deleteTask = async (id: string) => {
    supabase
      .from("tasks")
      .update({ deleted: true })
      .eq("id", id)
      .then(({ error }) => {
        if (error) {
          console.error("Error deleting todo:", error);
        } else {
          setTasks(tasks?.filter((task) => task.id !== id));
          getData();
        }
      });
  };

  useEffect(() => {
    getUser();
    getData();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      {/* <DataTable columns={columns} data={mockData} /> */}
      <ul>
        {tasks?.map((task, i) => (
          <li key={i}>
            {task.name}{" "}
            <Button size="sm" onClick={() => deleteTask(task.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default DashboardPage;
