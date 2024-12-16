import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private alertController: AlertController,
    private menuController: MenuController
  ) {}

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, 
        {
          text: 'Salir',
          handler: () => {
            this.menuController.close();
            

            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
            
            
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}