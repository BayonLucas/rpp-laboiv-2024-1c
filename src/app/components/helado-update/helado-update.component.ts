import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { HeladoService } from '../../services/helado.service';
import { Helado } from '../../models/helado';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'helado-update',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, FormsModule
  ],
  templateUrl: './helado-update.component.html',
  styleUrl: './helado-update.component.scss'
})
export class HeladoUpdateComponent {
  @Input() helado!:Helado;
  @Output() enviarHeladoUpdate = new EventEmitter<Helado>();

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


  onUpdateHelado(){
    if(this.form.valid){
      this.enviarHeladoUpdate.emit(this.helado);
    }
  }
}
