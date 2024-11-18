import { Component,ElementRef, OnInit,ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username!: string;
  password!: string;
  mensaje : string;
  btnContraseña : string;


  constructor(
    private toastController : ToastController,
    private router : Router,
    private dbService: DbService,
  ) { 
    this.mensaje = "Bienvenido"

    this.btnContraseña = "Opcion no disponible"
  }

  ngOnInit() {
  }


  validarCredenciales() {
    console.log("Ejecutando validacion ...")
    
    const login = this.dbService.findByUsername(this.username);

    if(login === undefined){
      this.generateMessage('Usuario no existe', 'danger');
      return;
    }

    if (
      this.username === login.username &&
      this.password === login.password
    ) {
      this.generateMessage('Login correcto', 'success');
      this.dbService.registerLoggedUser(login);
      let extras: NavigationExtras = {
        state: { user: this.username }
      }
      this.router.navigate(['/home'], extras);
    } else {
      this.generateMessage('Login fallido', 'danger');
    }
  }
  async generateMessage(message: string, color: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'middle',
      color: color
    });
    await toast.present();
  }

  async navegarARegistro(){
    await this.router.navigate(['/registro']);
  }

  async noDisponible(){
    const toast = await this.toastController.create({
      message: "Opcion no implementada por el momento",
      duration: 3000,
      position: 'middle',
      color: 'warning'
    });
    await toast.present();
  }

  

}

