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
    const isAuthenticated = this.dbService.isAuthenticated(); 

    if (!isAuthenticated) {
      this.router.navigate(['/login']); 
      return false;
    }
    return true; 
  }
}
