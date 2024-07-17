import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Repartidor } from '../../models/repartidor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosEmpleadoComponent } from '../../components/datos-empleado/datos-empleado.component';
import { DatosPaisComponent } from '../../components/datos-pais/datos-pais.component';
import { Pais } from '../../models/pais';

@Component({
  selector: 'app-detalle-repartidor',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, FormsModule, DatosEmpleadoComponent, DatosPaisComponent
  ],
  templateUrl: './detalle-repartidor.component.html',
  styleUrl: './detalle-repartidor.component.scss'
})
export class DetalleRepartidorComponent implements OnInit{
  private usuarioServ:UsuarioService = inject(UsuarioService);
  repartidores:Repartidor[] = [];
  repartidorElegido!:Repartidor;
  paisDelRepartidor!:Pais;
  
  

  seleccionarItem(item:Repartidor){
    this.repartidorElegido = item;
    this.paisDelRepartidor = item.paisOrigen;
  }

  ngOnInit(): void {
    this.usuarioServ.getRepartidores().subscribe( data => {
      this.repartidores = data
    });
  }
}
