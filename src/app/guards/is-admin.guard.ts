import { CanActivateFn } from '@angular/router';
import { Usuario } from '../models/usuario';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const usuarioActivo = JSON.parse(localStorage.getItem('usuario')!) as Usuario; 
  return usuarioActivo.role == 'admin';
};
