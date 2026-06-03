import { createReducer, on } from '@ngrx/store';
import { User } from '../../modules/core/models/User';
import * as userActions from './user.actions';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initState: UserState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initState,

  on(userActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
  on(userActions.loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
  on(userActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),

  on(userActions.addUserSuccess, (state, { user }) => ({
    ...state, users: [...state.users, user]
  }))
);
