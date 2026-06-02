import { inject, Injectable } from '@angular/core';
import { User } from '../models/User';
import { UserRole } from '../enums/userRole.enum';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _usersService= inject(UserService)
  _router = inject(Router)
  _toastr = inject(ToastrService)

  users: User[] = [{ id: 1, username: 'admin', password: '123456', role: UserRole.Admin }]

  currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(){
    this._usersService.getUsers().subscribe(users =>{
      this.users = users;
    })
  }



  login(username: string, password: string): boolean {
    debugger
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this._router.navigate(['/']);
      return true;
    } else {
      this._toastr.error('invalid username or password')
    }
    return false;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser')
    this._router.navigate(['/login']);
  }

}

