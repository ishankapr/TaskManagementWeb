import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { UserRole } from '../../../core/enums/userRole.enum';
import { User } from '../../../core/models/User';
import { UserService } from '../../../core/services/user.service';
import { fadeIn } from '../../../core/animation';
import { AppState } from '../../../../store/App/app.reducer';
import { Store } from '@ngrx/store';
import * as appActions from '../../../../store/App/app.actions'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, SelectModule, ButtonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  animations: [fadeIn]
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  userRoles = Object.values(UserRole);


  _fb = inject(FormBuilder)
  _userService = inject(UserService)
  _store = inject(Store<AppState>)
  _toastr = inject(ToastrService)

  ngOnInit(): void {

    this.userForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: [UserRole.User, Validators.required],
    });
  }

  addUser(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      const newUser: User = {
        ...formValue,
      };

      this._userService.addUser(newUser).subscribe(() => {
        this.userForm.reset({
          username: '',
          password: '',
          role: UserRole.User,
        });
        this._toastr.success('User added successfully');
        this._store.dispatch(appActions.toggleAddUserForm());
      });
    } else {
      this._toastr.error('Something went wrong');
    }
  }

  close() {
    this._store.dispatch(appActions.toggleAddUserForm())
  }
}
