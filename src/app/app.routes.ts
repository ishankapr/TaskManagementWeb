import { Routes } from '@angular/router';
import { MainLayoutComponent } from './modules/core/theme/main-layout/main-layout.component';
import { LoginComponent } from './modules/home/pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children:[
      {
        path:'',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'login',
        component: LoginComponent
      },
    ]
  }
];
