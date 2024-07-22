import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmarClaveValidator } from '../../validators/password.validator';
import { SAlertService } from '../../services/s-alert.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule, CommonModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  private router:Router = inject(Router);
  private alertServ:SAlertService = inject(SAlertService);

  get email(){
    return this.form.get('email')?.value;
  }
  get clave(){
    return this.form.get('clave')?.value;
  }
  get nombre(){
    return this.form.get('nombre')?.value;
  }

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repClave: new FormControl('', [Validators.required]),
  }, {
    validators: [
      confirmarClaveValidator(), 
    ] 
  });

  errorMessage: string | null = null;

  ngOnInit(): void {}

  async Registrar(){
    try{
      if (this.form.valid) {
        const nuevoUsuario = {
          email: this.email,
          clave: this.clave,
          nombreCompleto: this.nombre,
        }
        localStorage.setItem('nuevoUsuario', JSON.stringify(nuevoUsuario));
        this.router.navigateByUrl('/terminos-y-condiciones');
      }
    }
    catch(error:any){
      console.error(error)
      this.alertServ.showError(error!.message, 3000);
    }
  }
}
