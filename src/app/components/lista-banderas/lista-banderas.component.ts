import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { PaisesService } from '../../services/paises.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lista-banderas',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './lista-banderas.component.html',
  styleUrl: './lista-banderas.component.scss'
})
export class ListaBanderasComponent implements OnInit{
  private paisesService: PaisesService = inject(PaisesService);
  paisesAfrica!:any; 
  paisesEuropa!:any;
  
  // @Input() region!:string 
  @Output() enviarPais = new EventEmitter<string>();
  
  onClickEvent(pais: string){
    this.enviarPais.emit(pais);
  }





  ngOnInit(): void {
    this.paisesService.getPaises('europe').subscribe( (data) => {
      this.paisesEuropa = data;
      this.paisesEuropa = this.paisesEuropa.slice(5, 18);
      // console.log(this.paisesEuropa)
    });
    this.paisesService.getPaises('africa').subscribe( (data) => {
      this.paisesAfrica = data;
      this.paisesAfrica = this.paisesAfrica.slice(5, 16);
      // console.log(this.paisesAfrica)
    });
  }

}
