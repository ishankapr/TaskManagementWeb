import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { appReducer, AppState } from './App/app.reducer';
import { taskReducer, TaskState } from './Tasks/task.reducer';
import { userReducer, UserState } from './Users/user.reducer';

export interface State {
  App: AppState;
  Tasks: TaskState;
  Users: UserState;
}

export const reducers: ActionReducerMap<State> = {
  App: appReducer,
  Tasks: taskReducer,
  Users: userReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
