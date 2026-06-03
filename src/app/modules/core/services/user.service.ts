import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

const API_URL = 'https://localhost:7024/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/user`);
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${API_URL}/user`, user);
  }
}
