import { inject, Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Helado } from '../models/helado';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeladoService {
  private db:Firestore = inject(Firestore);
  private helados!:CollectionReference;

  constructor() { 
    this.helados = collection(this.db, 'helados');
  }

  async setHelado(helado:Helado){
    if(helado){
      const tupla = doc(this.helados);
      helado.id = tupla.id;
      setDoc(tupla, helado)
    }
  }

  async updateHelado(helado:Helado){
    if(helado){
      const registro = doc(this.helados, helado.id!);
      setDoc(registro, helado);
    }
  }
  async deleteHelado(helado:Helado){
    if(helado){
      const registro = doc(this.helados, helado.id!);
      deleteDoc(registro);
    }
  }

  getHelados(){
    return collectionData(this.helados).pipe( 
      map( helados => helados.map( helado => helado as Helado)
    ));
  }

}
