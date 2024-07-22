import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { SAlertService } from '../services/s-alert.service';

export const isAuthGuard: CanActivateFn = (route, state) => {
  const authServ:AuthService = inject(AuthService);
  const router:Router = inject(Router);
  const alertServ:SAlertService = inject(SAlertService);

  if(authServ.currentUser || localStorage.getItem('usuario')){
    return true;
  }
  else{
    alertServ.showError('Debe iniciar sesión', 2000);
    router.navigateByUrl('/bienvenido')
    return false;
  }

};
