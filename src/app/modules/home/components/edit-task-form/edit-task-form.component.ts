import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { TextareaModule } from 'primeng/textarea';
import { TaskStatus } from '../../../core/enums/TaskStatus.enum';
import { User } from '../../../core/models/User';
import { Observable } from 'rxjs';
import { Task } from '../../../core/models/Task';
import { fadeIn } from '../../../core/animation';
import { AppState } from '../../../../store/App/app.reducer';
import { Store } from '@ngrx/store';
import * as appActions from '../../../../store/App/app.actions';
import * as taskActions from '../../../../store/Tasks/task.actions';
import { getUsers } from '../../../../store/Users/user.selectors';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, SelectModule, ButtonModule, DrawerModule, TextareaModule],
  templateUrl: './edit-task-form.component.html',
  styleUrl: './edit-task-form.component.scss',
  animations: [fadeIn]
})
export class EditTaskFormComponent implements OnInit {

  @Input() task!: Task;

  visible = true;
  taskForm!: FormGroup;
  users$!: Observable<User[]>;
  taskStatuses = Object.values(TaskStatus);

  _fb = inject(FormBuilder);
  _store = inject(Store<AppState>);
  _toastr = inject(ToastrService);

  ngOnInit(): void {
    this.taskForm = this._fb.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description, Validators.required],
      status: [this.task.status, Validators.required],
      assignedTo: [this.task.assignedTo, Validators.required]
    });

    this.users$ = this._store.select(getUsers);
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        ...this.task,
        ...this.taskForm.value,
        assignedTo: +(this.taskForm.value.assignedTo)
      };
      this._store.dispatch(taskActions.updateTask({ task: updatedTask }));
      this._store.dispatch(appActions.toggleEditTaskForm());
      this._toastr.success('Task updated successfully');
    } else {
      this._toastr.error('Something went wrong');
    }
  }

  close() {
    this._store.dispatch(appActions.toggleEditTaskForm());
  }
}
