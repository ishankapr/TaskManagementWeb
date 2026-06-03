import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AvatarModule, ButtonModule, TooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private _router = inject(Router);
  currentuser!: any;

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    this.currentuser = JSON.parse(user ?? '');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this._router.navigate(['/login']);
  }
}
