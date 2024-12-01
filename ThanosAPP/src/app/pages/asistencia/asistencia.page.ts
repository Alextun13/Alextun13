import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  lista_asistencia: any[] = [];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    // La función generarAsistencias fue eliminada
  }

  volverPaginaPrincipal() {
    this.router.navigate(['/home']); 
  }

  RegistroQR() {
    this.router.navigate(['/registro-qr']); 
  }
}
