import { Component, inject, OnInit } from '@angular/core';
import { fadeIn } from '../../../core/animation';
import { AppState } from '../../../../store/App/app.reducer';
import { Store } from '@ngrx/store';
import * as appActions from '../../../../store/App/app.actions'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../core/models/User';
import { TaskService } from '../../../core/services/task.service';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';
import { TaskStatus } from '../../../core/enums/TaskStatus.enum';
import { Task } from '../../../core/models/Task';
import { UserRole } from '../../../core/enums/userRole.enum';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss',
  animations: [fadeIn]
})
export class AddTaskFormComponent implements OnInit {

  taskForm!: FormGroup;
  users: User[] = [];
  currentUser!: User | null
  currentUserRole: string =''
  taskStatuses = Object.values(TaskStatus);

  _store = inject(Store<AppState>)
  _fb = inject(FormBuilder)
  _taskService = inject(TaskService)
  _userService = inject(UserService)
  _toastr = inject(ToastrService)


  ngOnInit(): void {
    this.taskForm = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [TaskStatus.ToDo, Validators.required],
      assignedTo: ['', Validators.required]
    });

    this.getCurrentUserInfo()
  }


  getCurrentUserInfo(){
    const user = localStorage.getItem('currentUser');
    if(user){
      this.currentUser = JSON.parse(user);
      this.currentUserRole = this.currentUser?.role ?? ''
    }
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;
      this._taskService.addTask(newTask).subscribe(() => {
        this.taskForm.reset({
          title: '',
          description: '',
          status: TaskStatus.ToDo,
          assignedTo: ''
        });
      });
      this._toastr.success('Task added successfully');
      this._store.dispatch(appActions.toggleAddTaskForm())
      return
    }else{
      this._toastr.error('something went wrong');
    }
  }

  close() {
    this._store.dispatch(appActions.toggleAddTaskForm())
  }
}
