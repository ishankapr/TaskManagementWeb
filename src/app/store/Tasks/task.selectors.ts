import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

const taskFeatureState = createFeatureSelector<TaskState>('Tasks');

export const getTasks = createSelector(taskFeatureState, state => state.tasks);
export const getTasksLoading = createSelector(taskFeatureState, state => state.loading);
export const getTasksError = createSelector(taskFeatureState, state => state.error);
