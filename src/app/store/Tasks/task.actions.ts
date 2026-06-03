import { createAction, props } from '@ngrx/store';
import { Task } from '../../modules/core/models/Task';

export const loadTasks = createAction('[Tasks] Load Tasks');
export const loadTasksSuccess = createAction('[Tasks] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Tasks] Load Tasks Failure', props<{ error: string }>());

export const loadTasksForUser = createAction('[Tasks] Load Tasks For User', props<{ userId: number }>());
export const loadTasksForUserSuccess = createAction('[Tasks] Load Tasks For User Success', props<{ tasks: Task[] }>());
export const loadTasksForUserFailure = createAction('[Tasks] Load Tasks For User Failure', props<{ error: string }>());

export const addTask = createAction('[Tasks] Add Task', props<{ task: Omit<Task, 'id'> }>());
export const addTaskSuccess = createAction('[Tasks] Add Task Success', props<{ task: Task }>());
export const addTaskFailure = createAction('[Tasks] Add Task Failure', props<{ error: string }>());

export const updateTask = createAction('[Tasks] Update Task', props<{ task: Task }>());
export const updateTaskSuccess = createAction('[Tasks] Update Task Success', props<{ task: Task }>());
export const updateTaskFailure = createAction('[Tasks] Update Task Failure', props<{ error: string }>());

export const deleteTask = createAction('[Tasks] Delete Task', props<{ taskId: number }>());
export const deleteTaskSuccess = createAction('[Tasks] Delete Task Success', props<{ taskId: number }>());
export const deleteTaskFailure = createAction('[Tasks] Delete Task Failure', props<{ error: string }>());
