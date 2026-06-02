import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { TaskCardComponent } from '../../../shared/components/task-card/task-card.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { User } from '../../../core/models/User';
import { Observable, of, tap } from 'rxjs';
import { Task } from '../../../core/models/Task';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserCardComponent } from '../../../shared/components/user-card/user-card.component';
import { UserService } from '../../../core/services/user.service';
import { AppState } from '../../../../store/App/app.reducer';
import { Store } from '@ngrx/store';
import { getAddTaskForm, getAddUserForm, getEditTaskForm } from '../../../../store/App/app.selectors';
import * as appActions from '../../../../store/App/app.actions'
import { AddTaskFormComponent } from '../../components/add-task-form/add-task-form.component';
import { EditTaskFormComponent } from '../../components/edit-task-form/edit-task-form.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, TaskCardComponent, CommonModule, UserFormComponent, UserCardComponent, AddTaskFormComponent, EditTaskFormComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  currentUserRole: string = '';
  currentUser!: User
  selectedTaskForEdit!: Task;
  tasks$!: Observable<Task[]>
  users$!: Observable<User[]>
  showAddUserForm$!: Observable<boolean>
  showAddTaskForm$!: Observable<boolean>
  showEditTaskForm$: Observable<boolean> = of(false)


  _taskService = inject(TaskService)
  _userService = inject(UserService)
  _store = inject(Store<AppState>)
  _toastr = inject(ToastrService)

  ngOnInit(): void {
    this.getCurrentUser()
    this.loadTasks()
    this.loadUsers()

    this.showAddUserForm$ = this._store.select(getAddUserForm)
    this.showAddTaskForm$ = this._store.select(getAddTaskForm)
    this.showEditTaskForm$ = this._store.select(getEditTaskForm)
  }

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user ?? '')
      this.currentUserRole = this.currentUser.role
    }
  }


  loadTasks(): void {
    if (this.currentUserRole === 'Admin') {
      this.tasks$ = this._taskService.getTasks();
    } else if (this.currentUserRole === 'User') {
      this.tasks$ = this._taskService.getTasksForUser(this.currentUser.id)
    }
  }

  loadUsers() {
    this.users$ = this._userService.getUsers()
  }

  editTask(task: Task): void {
    this.selectedTaskForEdit = { ...task };
  }

  deleteTask(taskId: number): void {
    if (this.currentUserRole !== 'Admin') {
      this._toastr.error('You are not allowed to delete ');
      return;
    } else {
      this._taskService.deleteTask(taskId).subscribe({
        next: (tasks) => {
          this.tasks$ = this._taskService.getTasks();
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          this._toastr.error('Error deleting task')
        }
      });
    }

  }

  showAddUserForm() {
    this._store.dispatch(appActions.toggleAddUserForm())
  }

  showAddTaskForm() {
    this._store.dispatch(appActions.toggleAddTaskForm())
  }

}
