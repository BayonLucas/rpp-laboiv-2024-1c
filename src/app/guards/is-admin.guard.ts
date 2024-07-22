import { CanActivateFn } from '@angular/router';
import { Usuario } from '../models/usuario';
import { SAlertService } from '../services/s-alert.service';
import { inject } from '@angular/core';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const alertServ:SAlertService = inject(SAlertService);
  const usuarioActivo = JSON.parse(localStorage.getItem('usuario')!) as Usuario;
  
  if(usuarioActivo.role == 'admin'){
    return true;
  }
  else{
    alertServ.showError('Funcionalidad accesible únicamente para admins', 2500);
    return false;
  }


};
