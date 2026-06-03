import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../../modules/core/services/user.service';
import * as userActions from './user.actions';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map(users => userActions.loadUsersSuccess({ users })),
          catchError(error => of(userActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.addUser),
      mergeMap(({ user }) =>
        this.userService.addUser(user).pipe(
          map(createdUser => userActions.addUserSuccess({ user: createdUser })),
          catchError(error => of(userActions.addUserFailure({ error: error.message })))
        )
      )
    )
  );
}
