import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SAlertService } from '../services/s-alert.service';

export const tycInGuard: CanActivateFn = (route, state) => {
  const router:Router = inject(Router);
  const sAlertServ:SAlertService = inject(SAlertService);
  const ret = JSON.parse(localStorage.getItem('nuevoUsuario')!)

  if(ret){
    return true;
  }
  else{
    if(localStorage.getItem('usuario')){
      router.navigateByUrl('/home');
      sAlertServ.showError('No puede ingresar a esta parte', 2000)
    }
    else{
      router.navigateByUrl('/')
    }
    return false;
  }

};
