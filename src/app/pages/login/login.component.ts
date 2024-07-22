import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { SAlertService } from '../../services/s-alert.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  private authServ:AuthService = inject(AuthService);
  private usuarioServ:UsuarioService = inject(UsuarioService);
  private router:Router = inject(Router);
  private alertServ:SAlertService = inject(SAlertService);

  get email(){
    return this.form.get('email')?.value;
  }
  get contrasenia(){
    return this.form.get('contrasenia')?.value;
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasenia: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  errorMessage: string | null = null;

  ngOnInit(): void {}

  async IniciarSesion(){
    try{
      if (this.form.valid) {
        const data = await this.authServ.loguearUsuario(this.email, this.contrasenia);
        
        this.usuarioServ.getUsuarioPorUid(data.user.uid).pipe(take(1)).subscribe( data => {
          if(data){
            localStorage.setItem("usuario", JSON.stringify(data));
            this.router.navigate(['/home']);
          }
        });
      }
    }
    catch(error:any){
      console.log(error.message)
      switch (error!.message) {
        case "Firebase: Error (auth/invalid-credential).":
          this.errorMessage = "Credenciales invalidas";
          break;
        case "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).":
          this.errorMessage = "Email invalido";
          break;
        default:
          // this.errorMessage = e.code
          this.errorMessage = "Hubo un error inesperado. Intentelo nuevamente mas tarde.";
          break;
      }
      console.log(this.errorMessage)
      this.alertServ.showError(this.errorMessage!, 2500);
      
    }
  }
  
  CargarUsuario(rol: 'admin' | 'empleado'){
    const email = rol == 'admin'? 'usuarioadmin@asd.com' : 'usuarioempleado@asd.com'; 
    const clave = rol == 'admin'? '12345678' : '87654321'; 

    this.form.patchValue({
      email: email,
      contrasenia: clave
    });
  }
}
