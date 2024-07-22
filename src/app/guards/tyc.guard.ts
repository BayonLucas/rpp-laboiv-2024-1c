import { CanDeactivateFn } from '@angular/router';
import { TerminosYCondicionesComponent } from '../pages/terminos-y-condiciones/terminos-y-condiciones.component';
import { SAlertService } from '../services/s-alert.service';
import { inject } from '@angular/core';

export const tycGuard: CanDeactivateFn<TerminosYCondicionesComponent> = (component, currentRoute, currentState, nextState) => {
  // const nuevoUsuario = JSON.parse(localStorage.getItem('nuevoUsuario')!);
  // if(nuevoUsuario && component.form.get('email')?.value != nuevoUsuario.email && !component.form.get('tyc')?.value){
    //   return false
    // }
    
    // return true;
  const alertServ:SAlertService = inject(SAlertService);


  if(component.puedeContinuar){
    return true;
  }
  else{
    alertServ.showError('Favor de terminar de aceptar los términos y condiciones. Gracias', 3500)
    // alert('Favor de terminar de aceptar los términos y condiciones. Gracias')
    return false;
  }

};
