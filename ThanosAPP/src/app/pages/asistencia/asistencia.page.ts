import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ApiService } from '../../services/api.service'; // Ajusta la ruta si es necesario
import { Observable } from 'rxjs';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  lista_asistencia: any[] = [];
  fotoQR: string | null = null;

  
  constructor(private apiService: ApiService, private router: Router) {}


  ngOnInit() {
    this.generarAsistencias();
  }
  generarAsistencias() {
    throw new Error('Method not implemented.');
  }

  
}

  
  async abrirCamara() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64, // Capturamos la imagen en formato Base64
      });
  
      // Asignar fotoQR, usando null si base64String es undefined
      this.fotoQR = image.base64String ?? null; 
      console.log('Foto capturada:', this.fotoQR);
  
      // Llamar al servicio API para registrar la asistencia, simulando el uso de un código QR
      const asistencia = {
        nom_asig: 'PrograAppMovil', // Simulando el nombre de una clase
        qrCodeData: this.fotoQR // Aquí se podría enviar el dato del QR procesado
      };
  
      this.apiService.registrarAsistencia(asistencia).subscribe(
        (response: any) => { // Especificar el tipo de 'response'
          console.log('Asistencia registrada:', response);
        },
        (error: any) => { // Especificar el tipo de 'error'
          console.error('Error al registrar asistencia:', error);
        }
      );
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }
  
  generarAsistencias() {
    const clases = ['PrograBdd', 'PrograAppMovil', 'Hacking', 'Java1', 'MachineLearning'];

    this.lista_asistencia = clases.map(clase => ({
      nom_asig: clase,
      t_clases: 10,
      c_presente: Math.floor(Math.random() * 10),
      porcentaje: Math.floor(Math.random() * 100)
    }));
  }

  volverPaginaPrincipal() {
    this.router.navigate(['/home']);
  }
}
function generarAsistencias() {
  throw new Error('Function not implemented.');
}

