import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeladoAltaComponent } from '../../components/helado-alta/helado-alta.component';
import { HeladoBajaComponent } from '../../components/helado-baja/helado-baja.component';
import { HeladoListaComponent } from '../../components/helado-lista/helado-lista.component';
import { HeladoUpdateComponent } from '../../components/helado-update/helado-update.component';
import { Helado } from '../../models/helado';
import { HeladoService } from '../../services/helado.service';

@Component({
  selector: 'app-salen-helados',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HeladoAltaComponent,
    HeladoBajaComponent,
    HeladoListaComponent,
    HeladoUpdateComponent
  ],
  templateUrl: './salen-helados.component.html',
  styleUrl: './salen-helados.component.scss'
})
export class SalenHeladosComponent {
  private heladoServ:HeladoService = inject(HeladoService); 
  heladoSeleccionado!:Helado | null;
  heladoDelete!:Helado | null;

  recibirHeladoSeleccionado(helado:Helado){
    this.heladoSeleccionado = helado;
    this.heladoDelete = {...this.heladoSeleccionado}
  }

  recibirNuevoHelado(nuevoHelado:Helado){
    if(nuevoHelado){
      this.heladoServ.setHelado(nuevoHelado);
      this.heladoSeleccionado = null;
      this.heladoDelete = null;
    }
  }

  recibirHeladoUpdate(heladoUpdate:Helado){
    if(heladoUpdate){
      this.heladoServ.updateHelado(heladoUpdate);
      this.heladoSeleccionado = null;
      this.heladoDelete = null;
    }
  }
  
  recibirEliminarHelado(bool:any){
    if(bool){
      this.heladoServ.deleteHelado(this.heladoDelete!);
    }
    this.heladoSeleccionado = null;
    this.heladoDelete = null;
  }
}
