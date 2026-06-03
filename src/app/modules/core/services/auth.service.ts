import { inject, Injectable } from '@angular/core';
import { User } from '../models/User';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usersService = inject(UserService);
  private _router = inject(Router);
  private _toastr = inject(ToastrService);

  private users: User[] = [];
  currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this._usersService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this._router.navigate(['/']);
      return true;
    } else {
      this._toastr.error('Invalid username or password');
    }
    return false;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this._router.navigate(['/login']);
  }
}
