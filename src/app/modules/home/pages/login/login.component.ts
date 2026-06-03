import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  rightState = 'start';
  leftState = 'hidden';
  isDesktop = false;

  private _fb = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  loginForm!: FormGroup;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isDesktop = window.innerWidth > 768;
    if (!this.isDesktop) {
      this.rightState = 'end';
      this.leftState = 'visible';
    }
  }

  login(e: Event) {
    e.preventDefault();
    if (!this.loginForm.valid) return;

    const { username, password } = this.loginForm.value;
    this._authService.setCredentials(username, password);
    localStorage.setItem('currentUser', JSON.stringify({ username }));
    this._router.navigate(['/']);
  }
}
