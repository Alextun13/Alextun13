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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule  // Asegúrate de incluir HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AttendanceService,  // Agregar el servicio aquí
    ApiService          // Asegúrate de agregar ApiService aquí
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
