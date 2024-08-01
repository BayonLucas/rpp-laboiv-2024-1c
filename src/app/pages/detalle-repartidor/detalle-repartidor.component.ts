import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Repartidor } from '../../models/repartidor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosEmpleadoComponent } from '../../components/datos-empleado/datos-empleado.component';
import { DatosPaisComponent } from '../../components/datos-pais/datos-pais.component';
import { Pais } from '../../models/pais';
import * as XLSX from 'xlsx'
import { SAlertService } from '../../services/s-alert.service';

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
  private alertServ:SAlertService = inject(SAlertService);
  
  repartidores:Repartidor[] = [];
  repartidorElegido!:Repartidor;
  paisDelRepartidor!:Pais;
  
  exportarRepartidoresXlsx(){
    if(this.repartidores.length > 0){
      const aux = this.repartidores.map( repartidor => ({
        id: repartidor.id,
        dni: repartidor.dni,
        nombre: repartidor.nombre,
        edad: repartidor.edad,
        capTransporte: repartidor.capTransporte,
        unidadPropia: repartidor.unidadPropia? 'Si' : 'No',
        nombre_pais_origen: repartidor.paisOrigen.nombre,
        nombreOficial_pais_origen: repartidor.paisOrigen.nombreOficial,
        bandera_pais_origen_url: repartidor.paisOrigen.bandera,
        idioma: JSON.stringify(repartidor.paisOrigen.idioma)
      }));
      const ws = XLSX.utils.json_to_sheet(aux);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Placeholder');
      XLSX.writeFile(wb, 'Lista_repartidores.xlsx');
    }
    else{
      this.alertServ.showError('No hay registros que exportar a EXCEL.', 3000);
    }
  }

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
