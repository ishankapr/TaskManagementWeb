import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.reducer";

const appFeatureState = createFeatureSelector<AppState>('App')

export const getAddUserForm = createSelector(appFeatureState, state => state.toggleAddUserForm)
export const getAddTaskForm = createSelector(appFeatureState, state => state.toggleAddTaskForm)
export const getEditTaskForm = createSelector(appFeatureState, state => state.toggleEditTaskForm)
