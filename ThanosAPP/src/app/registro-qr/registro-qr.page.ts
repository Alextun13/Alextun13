import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa el AlertController

@Component({
  selector: 'app-registro-qr',
  templateUrl: './registro-qr.page.html',
  styleUrls: ['./registro-qr.page.scss'],
})
export class RegistroQrPage implements OnInit {
  asistencias: any[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController // Inyecta el AlertController
  ) {}

  ngOnInit() {
    this.cargarAsistencias();
  }

  cargarAsistencias() {
    const asistenciasGuardadas = localStorage.getItem('asistencias');
    if (asistenciasGuardadas) {
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

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  validarQR(datosQR: string) {
    const hoy = new Date().toISOString().split('T')[0]; // Obtener la fecha actual en formato 'YYYY-MM-DD'

    // Comprobar si el QR coincide con el esperado
    if (datosQR === 'INI24-P24-002D') {
      // Verificar si ya existe un registro de asistencia para hoy
      const registroExistente = this.asistencias.some(
        (asistencia) => asistencia.fecha === hoy
      );

      if (registroExistente) {
        // Mostrar alerta si ya hay un registro para hoy
        this.mostrarAlerta('Ya has registrado asistencia para hoy. Intenta nuevamente mañana.');
      } else {
        // Registrar la asistencia si no existe un registro para hoy
        this.registrarAsistencia(hoy);
      }
    } else {
      // Mostrar alerta si el código QR no es válido
      this.mostrarAlerta('El código QR escaneado no es válido. Por favor, intenta con un código correcto.');
    }
  }

  registrarAsistencia(fecha: string) {
    // Verificar si ya existe un registro para hoy antes de intentar guardar
    const registroExistente = this.asistencias.some(
      (asistencia) => asistencia.fecha === fecha
    );

    if (registroExistente) {
      // Si ya existe un registro para hoy, mostrar una alerta
      this.mostrarAlerta('Ya has registrado asistencia para hoy. Intenta nuevamente mañana.');
    } else {
      // Crear nueva asistencia solo si no existe un registro para hoy
      const nuevaAsistencia = { datosQR: 'INI24-P24-002D', fecha: fecha };
      this.asistencias.push(nuevaAsistencia);
      localStorage.setItem('asistencias', JSON.stringify(this.asistencias));

      this.mostrarAlerta('Asistencia registrada con éxito.');
    }
  }
}
 