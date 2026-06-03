import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

const userFeatureState = createFeatureSelector<UserState>('Users');

export const getUsers = createSelector(userFeatureState, state => state.users);
export const getUsersLoading = createSelector(userFeatureState, state => state.loading);
