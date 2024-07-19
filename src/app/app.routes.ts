import { Routes } from '@angular/router';
import { isAuthGuard } from '../app/guards/is-auth.guard'
import { isAdminGuard } from './guards/is-admin.guard';
import { tycGuard } from './guards/tyc.guard';
import { tycInGuard } from './guards/tyc-in.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'bienvenido', pathMatch: 'full' },
    { path:'bienvenido', 
        loadComponent: () => import('./pages/bienvenido/bienvenido.component').then(mod => mod.BienvenidoComponent)
    },
    { path:'home', 
        loadComponent: () => import('./pages/home/home.component').then(mod => mod.HomeComponent),
        canActivate: [isAuthGuard] 
    },
    { path:'login', 
        loadComponent: () => import('./pages/login/login.component').then(mod => mod.LoginComponent),
    },
    { path:'alta-repartidor', 
        loadComponent: () => import('./pages/alta-repartidor/alta-repartidor.component').then(mod => mod.AltaRepartidorComponent),
        canActivate: [isAuthGuard]         
    },
    { path:'detalle-repartidor', 
        loadComponent: () => import('./pages/detalle-repartidor/detalle-repartidor.component').then(mod => mod.DetalleRepartidorComponent),
        canActivate: [isAuthGuard]         
    },
    { path:'salen-helados', 
        loadComponent: () => import('./pages/salen-helados/salen-helados.component').then(mod => mod.SalenHeladosComponent),
        canActivate: [isAuthGuard, isAdminGuard]         
    },
    { path:'registro', 
        loadComponent: () => import('./pages/registro/registro.component').then(mod => mod.RegistroComponent),
    },
    { path:'terminos-y-condiciones', 
        loadComponent: () => import('./pages/terminos-y-condiciones/terminos-y-condiciones.component').then(mod => mod.TerminosYCondicionesComponent),
        canActivate: [tycInGuard],
        canDeactivate: [tycGuard]
    },
];
 