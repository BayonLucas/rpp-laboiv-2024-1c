import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth:Auth = inject(Auth);
  private router:Router = inject(Router);
  // private storeServ:StoreService = inject(StoreService);

  user$ = user(this.auth);
  userState$ = authState(this.auth);

  constructor() {
    this.user$.subscribe( (user) => {
    });
  }

  get currentUser(){
    return this.auth.currentUser
  }

  async loguearUsuario(email: string, password: string){
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async registrarUsuario(email:string, password:string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async cerrarSesionUsuario(){
    return await signOut(this.auth);
  }
}