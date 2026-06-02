import { TaskStatus } from "../enums/TaskStatus.enum";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo?: number; //  <------- user id
}
