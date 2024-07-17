import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { HeladoService } from '../../services/helado.service';
import { Helado } from '../../models/helado';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'helado-lista',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './helado-lista.component.html',
  styleUrl: './helado-lista.component.scss'
})
export class HeladoListaComponent implements OnInit{
  private heladoServ:HeladoService = inject(HeladoService);
  @Output() enviarHelado = new EventEmitter<Helado>();

  listaHelados:Helado[] = [];


  onEnviarHelado(helado:Helado){
    this.enviarHelado.emit(helado);
  }

  ngOnInit(): void {
    this.heladoServ.getHelados().subscribe( data => {
      this.listaHelados = data;
    });
  }
}
