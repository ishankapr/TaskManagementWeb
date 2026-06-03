import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
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

  _authService = inject(AuthService)
  currentuser!:any
  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    this.currentuser = JSON.parse(user ?? '')
  }

  logout(){
    this._authService.logout()
  }
}
