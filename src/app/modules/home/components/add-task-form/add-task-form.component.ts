import { Component, inject, OnInit } from '@angular/core';
import { fadeIn } from '../../../core/animation';
import { AppState } from '../../../../store/App/app.reducer';
import { Store } from '@ngrx/store';
import * as appActions from '../../../../store/App/app.actions';
import * as taskActions from '../../../../store/Tasks/task.actions';
import { getUsers } from '../../../../store/Users/user.selectors';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { User } from '../../../core/models/User';
import { TaskStatus } from '../../../core/enums/TaskStatus.enum';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AsyncPipe, InputTextModule, SelectModule, ButtonModule, TextareaModule],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss',
  animations: [fadeIn]
})
export class AddTaskFormComponent implements OnInit {

  taskForm!: FormGroup;
  users$!: Observable<User[]>;
  taskStatuses = Object.values(TaskStatus);

  _store = inject(Store<AppState>);
  _fb = inject(FormBuilder);
  _toastr = inject(ToastrService);

  ngOnInit(): void {
    this.taskForm = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [TaskStatus.ToDo, Validators.required],
      assignedTo: ['', Validators.required]
    });

    this.users$ = this._store.select(getUsers);
  }

  addTask(): void {
    if (this.taskForm.valid) {
      this._store.dispatch(taskActions.addTask({ task: this.taskForm.value }));
      this.taskForm.reset({ title: '', description: '', status: TaskStatus.ToDo, assignedTo: '' });
      this._toastr.success('Task added successfully');
      this._store.dispatch(appActions.toggleAddTaskForm());
    } else {
      this._toastr.error('Please fill in all required fields');
    }
  }

  close() {
    this._store.dispatch(appActions.toggleAddTaskForm());
  }
}
