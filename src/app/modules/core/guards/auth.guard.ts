import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router:Router = inject(Router);
  let isLogin = !!localStorage.getItem('currentUser');
  if(isLogin) return true
  return router.createUrlTree(['/login'])
};
