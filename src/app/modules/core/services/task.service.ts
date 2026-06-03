import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';

const API_URL = 'https://localhost:7024/api';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${API_URL}/task`);
  }

  getTasksForUser(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${API_URL}/task?assignedTo=${userId}`);
  }

  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(`${API_URL}/task`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${API_URL}/task/${task.id}`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/task/${taskId}`);
  }
}
