import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';

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
        this.usuarioServ.getUsuarioPorUid(data.user.uid).subscribe( data => {
          if(data){
            // console.log(data);
            localStorage.setItem("usuario", JSON.stringify(data));
            this.router.navigate(['/home']);
          }
        });
      }
    }
    catch(error){
      // console.log(error)
      switch (error) {
        case "auth/invalid-email":
          this.errorMessage = "Email invalido";
          break;
        default:
          // this.errorMessage = e.code
          break;
      }
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
