import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username = 'admin';
  password = '123456';

  setCredentials(username: string, password: string): void {
    this.username = username;
    this.password = password;
  }
}
