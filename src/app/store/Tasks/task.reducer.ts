import { createReducer, on } from '@ngrx/store';
import { Task } from '../../modules/core/models/Task';
import * as taskActions from './task.actions';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initState: TaskState = {
  tasks: [],
  loading: false,
  error: null
};

export const taskReducer = createReducer(
  initState,

  on(taskActions.loadTasks, taskActions.loadTasksForUser, (state) => ({
    ...state, loading: true, error: null
  })),
  on(taskActions.loadTasksSuccess, taskActions.loadTasksForUserSuccess, (state, { tasks }) => ({
    ...state, tasks, loading: false
  })),
  on(taskActions.loadTasksFailure, taskActions.loadTasksForUserFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  on(taskActions.addTaskSuccess, (state, { task }) => ({
    ...state, tasks: [...state.tasks, task]
  })),

  on(taskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map(t => t.id === task.id ? task : t)
  })),

  on(taskActions.deleteTaskSuccess, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== taskId)
  }))
);
