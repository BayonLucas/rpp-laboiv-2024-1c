import { Injectable, inject } from '@angular/core';
import { Repartidor } from '../models/repartidor';
import { CollectionReference, Firestore, collection, collectionData, doc, query, setDoc, where } from '@angular/fire/firestore';
import { map, Observable, take } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private db:Firestore = inject(Firestore);
  private empleados!:CollectionReference;
  private usuarios!:CollectionReference;

  constructor() { 
    this.empleados = collection(this.db, 'empleados');
    this.usuarios = collection(this.db, 'users');
  }

  async setRepartidor(repartidor:Repartidor){
    if(repartidor){
      const tupla = doc(this.empleados);
      repartidor.id = tupla.id;
      setDoc(tupla, repartidor)
    }
  }

  async setUsuario(usuario:Usuario){
    if(usuario){
      const tupla = doc(this.usuarios);
      usuario.id = tupla.id;
      setDoc(tupla, usuario)
    }
  }

  getRepartidores(){
    return collectionData(this.empleados).pipe( 
      map( usuarios => usuarios.map( user => user as Repartidor)
    ));
  }

  getUsuarioPorUid(uid:string): Observable<Usuario> {
    let qry = query(
      this.usuarios,
      where('uid', '==', uid)
    );
    return collectionData(qry).pipe(
      map( usuarios => usuarios[0] as Usuario ));
  }

}
