import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { coincidirEmailValidator } from '../../validators/emailTyC.validator';
import { SAlertService } from '../../services/s-alert.service';

@Component({
  selector: 'app-terminos-y-condiciones',
  standalone: true,
  imports: [
    FormsModule, CommonModule, ReactiveFormsModule
  ],
  templateUrl: './terminos-y-condiciones.component.html',
  styleUrl: './terminos-y-condiciones.component.scss'
})
export class TerminosYCondicionesComponent {
  private authServ:AuthService = inject(AuthService);
  private usuarioServ:UsuarioService = inject(UsuarioService);
  private router:Router = inject(Router);
  private alertServ:SAlertService = inject(SAlertService);

  puedeContinuar:boolean = false;

  get email(){
    return this.form.get('email')?.value;
  }
  get tyc(){
    return this.form.get('tyc')?.value;
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    tyc: new FormControl('', []),
  }, { validators: [ coincidirEmailValidator() ] });


  
  async Registrar(){
      if (this.form.valid && this.tyc) {
        const dataRegistro = JSON.parse(localStorage.getItem('nuevoUsuario')!);
        this.authServ.registrarUsuario(dataRegistro.email, dataRegistro.clave).then( (data) => {
          const nuevoUsuario = <Usuario>{
            uid: data.user.uid,
            email: data.user.email,
            nombreCompleto: dataRegistro!.nombreCompleto,
            role: 'empleado'
          }
          this.usuarioServ.setUsuario(nuevoUsuario);
          localStorage.removeItem('nuevoUsuario');
          localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
          this.puedeContinuar = true;
          this.router.navigateByUrl('/home');
        }).catch( (error:Error) => {
          console.log(error!.message)
          let msj = '';
          switch(error.message){
            case 'Firebase: Error (auth/email-already-in-use).':
              msj = 'El correo ingresado ya fue utilizado. Intente con otro.';
              break;
          }
          this.puedeContinuar = true;
          this.alertServ.showError(msj, 5000);
          localStorage.removeItem('nuevoUsuario');
          localStorage.removeItem('usuario');
          this.router.navigateByUrl('/registro');
        });
      }
  }
}
