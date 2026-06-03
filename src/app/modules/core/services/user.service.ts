import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/users`);
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${API_URL}/users`, user);
  }
}
