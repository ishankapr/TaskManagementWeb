import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TaskService } from '../../modules/core/services/task.service';
import * as taskActions from './task.actions';

@Injectable()
export class TaskEffects {
  private actions$ = inject(Actions);
  private taskService = inject(TaskService);

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.loadTasks),
      mergeMap(() =>
        this.taskService.getTasks().pipe(
          map(tasks => taskActions.loadTasksSuccess({ tasks })),
          catchError(error => of(taskActions.loadTasksFailure({ error: error.message })))
        )
      )
    )
  );

  loadTasksForUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.loadTasksForUser),
      mergeMap(({ userId }) =>
        this.taskService.getTasksForUser(userId).pipe(
          map(tasks => taskActions.loadTasksForUserSuccess({ tasks })),
          catchError(error => of(taskActions.loadTasksForUserFailure({ error: error.message })))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.addTask),
      mergeMap(({ task }) =>
        this.taskService.addTask(task).pipe(
          map(createdTask => taskActions.addTaskSuccess({ task: createdTask })),
          catchError(error => of(taskActions.addTaskFailure({ error: error.message })))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.updateTask),
      mergeMap(({ task }) =>
        this.taskService.updateTask(task).pipe(
          map(updatedTask => taskActions.updateTaskSuccess({ task: updatedTask })),
          catchError(error => of(taskActions.updateTaskFailure({ error: error.message })))
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(taskActions.deleteTask),
      mergeMap(({ taskId }) =>
        this.taskService.deleteTask(taskId).pipe(
          map(() => taskActions.deleteTaskSuccess({ taskId })),
          catchError(error => of(taskActions.deleteTaskFailure({ error: error.message })))
        )
      )
    )
  );
}
