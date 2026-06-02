import { Injectable } from '@angular/core';
import { TaskStatus } from '../enums/TaskStatus.enum';
import { Task } from '../models/Task';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      status: TaskStatus.ToDo,
      assignedTo: 3
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      status: TaskStatus.InProgress,
      assignedTo: 3
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description for Task 3',
      status: TaskStatus.ToDo,
      assignedTo: 5
    },
    {
      id: 4,
      title: 'Task 4',
      description: 'Description for Task 4',
      status: TaskStatus.Done,
      assignedTo: 3
    },
    {
      id: 5,
      title: 'Task 5',
      description: 'Description for Task 5',
      status: TaskStatus.ToDo,
      assignedTo: 5
    }
  ];

 // Get All Tasks
  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  // Get Tasks For Specific User
  getTasksForUser(userId: number): Observable<Task[]> {
    return of(this.tasks.filter(task => task.assignedTo === userId));
  }

  addTask(task: Task): Observable<void> {
    return new Observable(observer => {
      this.tasks.push(task);
      observer.next();
      observer.complete();
    });
  }

  updateTask(task: Task): Observable<void> {
    return new Observable(observer => {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) {
        this.tasks[index] = task;
      }
      observer.next();
      observer.complete();
    });
  }

  deleteTask(taskId: number): Observable<Task[]> {
    return new Observable((observer) => {
      try {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        observer.next(this.tasks);
        observer.complete();
      } catch (error) {
        observer.error(error);
      }
    });
  }

}
