import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskStatus } from '../../../core/enums/TaskStatus.enum';
import { TaskService } from '../../../core/services/task.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/User';
import { Observable } from 'rxjs';
import { Task } from '../../../core/models/Task';
import { fadeIn } from '../../../core/animation';
import { AppState } from '../../../../store/App/app.reducer';
import { Store } from '@ngrx/store';
import * as appActions from '../../../../store/App/app.actions'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-task-form.component.html',
  styleUrl: './edit-task-form.component.scss',
  animations: [fadeIn]
})
export class EditTaskFormComponent implements OnInit {

  @Input() task!: Task

  taskForm!: FormGroup
  users$!: Observable<User[]>
  tasks$!: Observable<Task[]>
  currentUser!: User | null
  currentUserRole: string = ''
  taskStatuses = Object.values(TaskStatus);

  _fb = inject(FormBuilder)
  _taskService = inject(TaskService)
  _authService = inject(AuthService)
  _userService = inject(UserService)
  _store = inject(Store<AppState>)
  _toastr = inject(ToastrService)

  ngOnInit(): void {
    this.taskForm = this._fb.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description, Validators.required],
      status: [this.task.status, Validators.required],
      assignedTo: [this.task.assignedTo, Validators.required]
    });

    this.loadTasksAndUsers()
    this.getCurrentUserInfo()
  }


  saveTask(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        ...this.task,
        ...this.taskForm.value,
        assignedTo: +(this.taskForm.value.assignedTo)
      };
      this._store.dispatch(appActions.toggleEditTaskForm())
      this._taskService.updateTask(updatedTask).subscribe()
      this._toastr.success('Task updated successfully');
      return;
    } else {
      this._toastr.error('Something went wrong');
    }
  }

  getCurrentUserInfo() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.currentUserRole = this.currentUser?.role ?? ''
    }
  }


  loadTasksAndUsers(): void {
    this.users$ = this._userService.getUsers();
    this.tasks$ = this._taskService.getTasks();
  }

  close() {
    this._store.dispatch(appActions.toggleEditTaskForm())
  }
}
