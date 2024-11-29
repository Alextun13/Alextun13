import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro-qr',
  templateUrl: './registro-qr.page.html',
  styleUrls: ['./registro-qr.page.scss'],
})
export class RegistroQrPage implements OnInit {
  asistencias: any[] = [];

  constructor(private router: Router,) {}

  ngOnInit() {
    this.cargarAsistencias();
  }

  cargarAsistencias() {
    const asistenciasGuardadas = localStorage.getItem('asistencias');
    if (asistenciasGuardadas) {
      // Filtrar asistencias para incluir solo aquellas con datos válidos
      this.asistencias = JSON.parse(asistenciasGuardadas).filter(
        (asistencia: any) => asistencia.datosQR && asistencia.datosQR.trim().length > 0
      );
    } else {
      this.asistencias = [];
    }
  }
  

  limpiarAsistencias() {
    localStorage.removeItem('asistencias');
    this.asistencias = [];
  }

  volverPaginaPrincipal() {
    this.router.navigate(['/home']); 
  }
  
}
