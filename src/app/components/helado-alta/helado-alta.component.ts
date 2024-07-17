import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeladoService } from '../../services/helado.service';
import { Helado } from '../../models/helado';

@Component({
  selector: 'helado-alta',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './helado-alta.component.html',
  styleUrl: './helado-alta.component.scss'
})
export class HeladoAltaComponent {
  @Output() enviarNuevoHelado = new EventEmitter<Helado>();

  get sabor(){
    return this.form.get('sabor')?.value;
  }
  get tipo(){
    return this.form.get('tipo')?.value;
  }
  get precio(){
    return this.form.get('precio')?.value;
  }
  get peso_aprox(){
    return this.form.get('peso_aprox')?.value;
  }

  form: FormGroup = new FormGroup({
    sabor: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required, Validators.min(0)]),
    peso_aprox: new FormControl('', [Validators.required, Validators.min(250), Validators.max(1000)]),
  });

  onAltaHelado(){
    if(this.form.valid){
      const nuevoHelado = <Helado>{
        sabor: this.sabor,
        tipo: this.tipo,
        precio: this.precio,
        peso_aprox: this.peso_aprox
      }

      if(nuevoHelado){
        this.enviarNuevoHelado.emit(nuevoHelado);
        this.form.reset();
      }
    }
  }

}
