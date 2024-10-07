import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DbService } from '../services/db.service'; // Asegúrate de que el servicio de autenticación esté implementado.

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private dbService: DbService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.dbService.isAuthenticated(); // Implementa este método en tu servicio de autenticación.

    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirige a la página de login si no está autenticado.
      return false;
    }
    return true; // Permite el acceso si está autenticado.
  }
}
