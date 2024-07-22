import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'nav-component',
  standalone: true,
  imports: [
    RouterLink, CommonModule, ReactiveFormsModule, FormsModule
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  authServ:AuthService = inject(AuthService);
  private router:Router = inject(Router);

  async CerrarSesion(){
    await this.authServ.cerrarSesionUsuario();
    localStorage.removeItem('usuario');
    this.router.navigateByUrl('/bienvenido');
  }

}
