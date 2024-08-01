import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListaBanderasComponent } from '../../components/lista-banderas/lista-banderas.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Repartidor } from '../../models/repartidor';
import { UsuarioService } from '../../services/usuario.service';
import { Pais } from '../../models/pais';
import { SAlertService } from '../../services/s-alert.service';

@Component({
  selector: 'app-alta-repartidor',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, ListaBanderasComponent, MatSlideToggleModule
  ],
  templateUrl: './alta-repartidor.component.html',
  styleUrl: './alta-repartidor.component.scss'
})
export class AltaRepartidorComponent {
  private router:Router = inject(Router);
  private userServ:UsuarioService = inject(UsuarioService);
  private sAlertServ:SAlertService = inject(SAlertService);
  private paisElegido!:Pais;
  errorMessage: string | null = null;

  

  
  form: FormGroup = new FormGroup({
    dni: new FormControl('', [Validators.required, Validators.minLength(7)]),
    nombre: new FormControl('', [Validators.required]),
    edad: new FormControl('', [Validators.required, Validators.min(18), Validators.max(75)]),
    capTransporte: new FormControl('', [Validators.required, Validators.min(0)]),
    paisOrigen: new FormControl('', [Validators.required]),
    unidadPropia: new FormControl('', []),
  });

  get dni(){
    return this.form.get('dni')?.value;
  }
  get nombre(){
    return this.form.get('nombre')?.value;
  }
  get edad(){
    return this.form.get('edad')?.value;
  }
  get capTransporte(){
    return this.form.get('capTransporte')?.value;
  }
  get paisOrigen(){
    return this.form.get('paisOrigen')?.value;
  }
  get unidadPropia(){
    return this.form.get('unidadPropia')?.value;
  }
  
  recibirPaisOrigen(event:any){
    this.paisElegido = event;
    this.form.patchValue({
      paisOrigen: event.nombre,
    });
  }

  async Registrar(){
    if(this.form.valid){
      const nuevoEmpleado = <Repartidor>{
        dni: this.dni,
        nombre: this.nombre,
        edad: this.edad,
        capTransporte: this.capTransporte,
        paisOrigen: this.paisElegido,
        unidadPropia: this.unidadPropia,
        id: '',
      }
      await this.userServ.setRepartidor(nuevoEmpleado);
      this.sAlertServ.showSuccess('Repartidor registrado', 2000);
      this.form.reset();
      this.router.navigateByUrl('/home');
    }
  }

}
