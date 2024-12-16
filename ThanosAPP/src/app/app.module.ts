import { NgModule } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Nuevas importaciones
import { HttpClientModule } from '@angular/common/http';  // Para manejar HTTP requests
import { AttendanceService } from './services/attendance.service';  // El servicio de asistencia
import { ApiService } from './services/api.service';  // Asegúrate de que la ruta sea correcta

// LocalStorage
import { IonicStorageModule } from '@ionic/storage-angular';


import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importar el enrutador
import { DbService } from './services/db.service'; // Importar el servicio que maneja la sesión


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,  // Asegúrate de incluir HttpClientModule
    IonicStorageModule.forRoot(), // Aqui se esta iniciando el LocalStorage
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AttendanceService,  // Agregar el servicio aquí
    ApiService          // Asegúrate de agregar ApiService aquí
  ],
  bootstrap: [AppComponent],
})

export class AppModule {  constructor(
  private dbService: DbService, // Inyectar el servicio de base de datos
  private router: Router        // Inyectar el servicio de enrutamiento
) {}

cerrarSesion() {
  this.router.navigate(['/login']); // Redirigir al usuario al inicio de sesión
}
}


