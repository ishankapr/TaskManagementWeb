import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  rightState = 'start';
  leftState = 'hidden';
  isDesktop = false;
  _fb = inject(FormBuilder)
  _authService = inject(AuthService)
  loginForm!: FormGroup


  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

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
    e.preventDefault()
    this._authService.login(this.loginForm.value.username, this.loginForm.value.password)
  }

}
