import { getTasksByUserId, getUsersId } from "./actions";
import { Task } from "../types/task.type";
import TaskList from "./components/TaskList";

export const revalidate = 0;

const ServerComponent = async () => {
  // get user
  const userId = await getUsersId();

  // get user tasks
  let tasks: Task[] | null = [];

  if (userId) {
    tasks = await getTasksByUserId(userId);
  }

  return (
    <>
      <h1>Server rendered component</h1>
      <TaskList tasks={tasks} getTasks={getTasksByUserId} />
    </>
  );
};

export default ServerComponent;
