export type Task = {
  id: string;
  created_at: string; // Convert to date on the fly??
  name: string;
  completed: boolean;
  deleted: boolean;
  user: string;
};
