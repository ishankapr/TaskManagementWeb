import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TaskCardComponent } from '../../../shared/components/task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { User } from '../../../core/models/User';
import { Observable } from 'rxjs';
import { Task } from '../../../core/models/Task';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { AppState } from '../../../../store/App/app.reducer';
import { Store } from '@ngrx/store';
import { getAddTaskForm, getAddUserForm, getEditTaskForm } from '../../../../store/App/app.selectors';
import * as appActions from '../../../../store/App/app.actions';
import * as taskActions from '../../../../store/Tasks/task.actions';
import * as userActions from '../../../../store/Users/user.actions';
import { getTasks } from '../../../../store/Tasks/task.selectors';
import { getUsers } from '../../../../store/Users/user.selectors';
import { AddTaskFormComponent } from '../../components/add-task-form/add-task-form.component';
import { EditTaskFormComponent } from '../../components/edit-task-form/edit-task-form.component';
import { ToastrService } from 'ngx-toastr';
import { UserRole } from '../../../core/enums/userRole.enum';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, TaskCardComponent, CommonModule, UserFormComponent, AddTaskFormComponent, EditTaskFormComponent, ButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  currentUser!: User;
  get currentUserRole(): string { return this.currentUser?.role ?? ''; }
  selectedTaskForEdit!: Task;
  tasks$!: Observable<Task[]>;
  users$!: Observable<User[]>;
  showAddUserForm$!: Observable<boolean>;
  showAddTaskForm$!: Observable<boolean>;
  showEditTaskForm$!: Observable<boolean>;

  _store = inject(Store<AppState>);
  _toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getCurrentUser();

    this._store.dispatch(taskActions.loadTasks());
    this._store.dispatch(userActions.loadUsers());

    this.tasks$ = this._store.select(getTasks);
    this.users$ = this._store.select(getUsers);
    this.showAddUserForm$ = this._store.select(getAddUserForm);
    this.showAddTaskForm$ = this._store.select(getAddTaskForm);
    this.showEditTaskForm$ = this._store.select(getEditTaskForm);
  }

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  editTask(task: Task): void {
    this.selectedTaskForEdit = { ...task };
  }

  deleteTask(taskId: number): void {
    if (this.currentUser.role !== UserRole.Admin) {
      this._toastr.error('You are not allowed to delete');
      return;
    }
    this._store.dispatch(taskActions.deleteTask({ taskId }));
  }

  showAddUserForm() {
    this._store.dispatch(appActions.toggleAddUserForm());
  }

  showAddTaskForm() {
    this._store.dispatch(appActions.toggleAddTaskForm());
  }
}
