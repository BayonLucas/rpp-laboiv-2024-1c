import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Helado } from '../../models/helado';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'helado-baja',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule, CommonModule
  ],
  templateUrl: './helado-baja.component.html',
  styleUrl: './helado-baja.component.scss'
})
export class HeladoBajaComponent {
  @Output() enviarHeladoDelete = new EventEmitter<boolean>();
  @Input() helado!:Helado;

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

  onDeleteHelado(bool:boolean){
    this.enviarHeladoDelete.emit(bool);
  }

}
