import { Component, OnInit} from '@angular/core';
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
    this.generarAsistencias();
  }
  generarAsistencias() {
    const clases = ['PrograBdd', 'PrograAppMovil', 'Hacking', 'Java1', 'MachineLearning'];
    this.lista_asistencia = clases.map(clase => ({
      nom_asig: clase,
      t_clases: 10, // Número total de clases fijo
      c_presente: Math.floor(Math.random() * 10), // Clases asistidas aleatorias
      porcentaje: Math.floor(Math.random() * 100) // Porcentaje aleatorio
    }));
  }
  volverPaginaPrincipal() {
    this.router.navigate(['/home']); 
  }



  RegistroQR() {
    this.router.navigate(['/registro-qr']); 
  }
}