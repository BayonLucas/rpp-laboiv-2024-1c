import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Repartidor } from '../../models/repartidor';

@Component({
  selector: 'datos-empleado',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  templateUrl: './datos-empleado.component.html',
  styleUrl: './datos-empleado.component.scss'
})
export class DatosEmpleadoComponent {
  @Input() repartidor!:Repartidor; 


}
