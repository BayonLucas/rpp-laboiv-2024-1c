import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SAlertService {

  async showError(msj:string, duration:number){
    return await Swal.fire({
      icon: 'error',
      toast: true,
      timer: duration,
      position: 'bottom',
      text: msj,
      title: 'Ocurrió un error',
      showConfirmButton: false,
    })
  } 
  async showSuccess(msj:string, duration:number){
    return await Swal.fire({
      icon: 'success',
      toast: true,
      timer: duration,
      position: 'bottom',
      text: msj,
      title: 'Excelente',
      showConfirmButton: false,
    })
  } 



}
