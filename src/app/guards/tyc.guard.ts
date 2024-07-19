import { CanDeactivateFn } from '@angular/router';
import { TerminosYCondicionesComponent } from '../pages/terminos-y-condiciones/terminos-y-condiciones.component';

export const tycGuard: CanDeactivateFn<TerminosYCondicionesComponent> = (component, currentRoute, currentState, nextState) => {
  const nuevoUsuario = JSON.parse(localStorage.getItem('nuevoUsuario')!);
  if(nuevoUsuario && component.form.get('email')?.value != nuevoUsuario.email && !component.form.get('tyc')?.value){
    alert('Favor de terminar de aceptar los términos y condiciones. Gracias')
    return false
  }

  return true;
};
