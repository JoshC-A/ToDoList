"use client";

import { Task } from "@/app/types/task.type";
import { deleteTask } from "../mutations";
import { useState, useTransition } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  block?: boolean;
  round?: boolean;
  loading?: boolean;
}

export const revalidate = 0;

const TaskList = ({ tasks }: any) => {
  const [isPending, startTransition] = useTransition();
  const [myTasks, setMyTasks] = useState();

  const deleteTaskById = async (taskId: string) => {
    startTransition(async () => {
      setMyTasks(tasks);
      await deleteTask(taskId);
    });
  };

  return (
    <ul>
      {tasks.map((task: Task) => {
        return (
          <li key={task.id}>
            {task.name}
            <button
              onClick={() => deleteTaskById(task.id)}
              disabled={isPending}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TaskList;
