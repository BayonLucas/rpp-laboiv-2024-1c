import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const isAuthGuard: CanActivateFn = (route, state) => {
  const authServ:AuthService = inject(AuthService);
  const router:Router = inject(Router);

  if(authServ.currentUser){
    return true;
  }
  else{
    router.navigateByUrl('/bienvenido')
    return false;
  }

};
