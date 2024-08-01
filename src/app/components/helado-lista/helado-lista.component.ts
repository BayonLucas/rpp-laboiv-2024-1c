import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { HeladoService } from '../../services/helado.service';
import { Helado } from '../../models/helado';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { jsPDF } from "jspdf";
import { SAlertService } from '../../services/s-alert.service';

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
  private alertServ:SAlertService = inject(SAlertService);

  @Output() enviarHelado = new EventEmitter<Helado>();

  listaHelados:Helado[] = [];

  exportarHeladosPdf(){
    if(this.listaHelados.length > 0){
      const doc = new jsPDF();

      doc.setFontSize(50);
      doc.text('Lista de helados', 40, 19);
      doc.line(0, 20, 250, 20)
      let y = 40;
      doc.setFontSize(15);
      
      const tableData = this.listaHelados.map(item => {
        return {
          'ID': item.id!,
          'Sabor': item.sabor,
          'Tipo': item.tipo,
          'Precio ($)': item.precio.toString(),
          'Peso (g)': item.peso_aprox.toString()
        };
      });
      const headers = [
        'ID',
        'Sabor',
        'Tipo',
        'Precio ($)',
        'Peso (g)',
      ];

      doc.table(20, y, tableData, headers, { autoSize: true, fontSize: 13 });

      doc.save('Lista_helados.pdf')
    }
    else{
      this.alertServ.showError('No hay registros que exportar a PDF.', 3000);
    }
  }

  onEnviarHelado(helado:Helado){
    this.enviarHelado.emit(helado);
  }

  ngOnInit(): void {
    this.heladoServ.getHelados().subscribe( data => {
      this.listaHelados = data;
    });
  }
}
