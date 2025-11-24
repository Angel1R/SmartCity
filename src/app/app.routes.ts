import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // <-- CAMBIO CLAVE: Redirige al login al iniciar
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'tabs', // Esta es la ruta a la que irás DESPUÉS de loguearte
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
];