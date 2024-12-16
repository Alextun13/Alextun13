import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';  // Importa el AlertController

@Component({
  selector: 'app-registro-qr',
  templateUrl: './registro-qr.page.html',
  styleUrls: ['./registro-qr.page.scss'],
})
export class RegistroQrPage implements OnInit {
  asistencias: any[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController  // Inyecta el AlertController
  ) {}

  ngOnInit() {
    this.cargarAsistencias();
  }

  cargarAsistencias() {
    const asistenciasGuardadas = localStorage.getItem('asistencias');
    if (asistenciasGuardadas) {
      // Filtrar asistencias para incluir solo aquellas con datos válidos y el código QR correcto
      this.asistencias = JSON.parse(asistenciasGuardadas).filter(
        (asistencia: any) => {
          const qrValido = asistencia.datosQR && asistencia.datosQR.trim().length > 0;
          // Verifica si el QR es válido
          return qrValido && asistencia.datosQR === 'INI24-P24-002D';
        }
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

  // Método para mostrar un mensaje de alerta si el QR no es válido
  async mostrarAlerta() {
    const alert = await this.alertController.create({
      header: 'QR No Válido',
      message: 'El código QR escaneado no es válido. Por favor, intente con un código correcto.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Método para manejar la validación del código QR
  validarQR(datosQR: string) {
    if (datosQR === 'INI24-P24-002D') {
      // Si el QR es válido, registrar la asistencia
      this.cargarAsistencias();
    } else {
      // Si el QR no es válido, mostrar una alerta
      this.mostrarAlerta();
    }
  }
}
