import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pais } from '../../models/pais';

@Component({
  selector: 'datos-pais',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './datos-pais.component.html',
  styleUrl: './datos-pais.component.scss'
})
export class DatosPaisComponent {
  @Input() pais!:Pais; 

}
