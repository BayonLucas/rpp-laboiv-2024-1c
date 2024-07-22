import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const tycInGuard: CanActivateFn = (route, state) => {
  const router:Router = inject(Router)
  const ret = JSON.parse(localStorage.getItem('usuarioNuevo')!)

  if(ret != null || ret != undefined){
    router.navigateByUrl('/')
    return false;
  }
  else{
    return true;
  }


};
