import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../../core/models/Task';
import { CommonModule } from '@angular/common';
import { TaskStatus } from '../../../core/enums/TaskStatus.enum';
import { TaskService } from '../../../core/services/task.service';
import { User } from '../../../core/models/User';
import { AppState } from '../../../../store/App/app.reducer';
import { Store } from '@ngrx/store';
import * as appActions from '../../../../store/App/app.actions'
import { ToastrService } from 'ngx-toastr';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule, ButtonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  @Input() task!: Task | any;
  @Input() users!: User[] | any[];
  @Input() currentUserRole: string ='';
  @Output() deleteTask = new EventEmitter<number>();
  @Output() editTaskEvent = new EventEmitter<Task>();

  _tasksService =inject(TaskService)
  _store =inject(Store<AppState>)
  _toastr = inject(ToastrService)

  editTask(): void {
    this.editTaskEvent.emit(this.task);
    this._store.dispatch(appActions.toggleEditTaskForm())
  }

  onDeleteClick(): void {
    this.deleteTask.emit(this.task.id);
  }

  getStatusClass(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.ToDo:
        return 'toDo';
      case TaskStatus.InProgress:
        return 'inProgress';
      case TaskStatus.Done:
        return 'done';
      case TaskStatus.NeedDetails:
        return 'needDetails';
      default:
        return '';
    }
  }

  getTaskAssigneeUser(task: Task): string | undefined {
    const user = this.users.find(user => user.id === task.assignedTo);
    return user?.username;
  }

  getStatusSeverity(status: TaskStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    switch (status) {
      case TaskStatus.ToDo: return 'secondary';
      case TaskStatus.InProgress: return 'info';
      case TaskStatus.Done: return 'success';
      case TaskStatus.NeedDetails: return 'danger';
      default: return 'secondary';
    }
  }
}
