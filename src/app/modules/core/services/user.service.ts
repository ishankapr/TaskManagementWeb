import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { UserRole } from '../enums/userRole.enum';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [
    {
      id: 1,
      username: 'admin',
      password: '123456',
      role: UserRole.Admin
    },
    {
      id: 2,
      username: 'user',
      password: '123456',
      role: UserRole.User,
    },
  ];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(user: User): Observable<void> {
    return new Observable(observer => {
      this.users.push({ ...user, id: this.users.length + 1 });
      observer.next();
      observer.complete();
    });
  }
}
