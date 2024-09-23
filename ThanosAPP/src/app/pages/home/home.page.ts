import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  username: string = 'guest';
  name!: string;
  lastname!: string;
  carrera!: string;
  birthday!: string;
  edLevels: Map<string, string> = new Map<string, string>
  alertButtons = ['Ok'];
  

  constructor(
    private toastController : ToastController,
    private router: Router
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if(state){
      console.log(`Username: ${state['user']}`)
      this.username = state['user']
    }
    
    this.edLevels.set('0', 'Ingeniería en informática');
    this.edLevels.set('1', 'Mecánica');
    this.edLevels.set('2', 'Analista programador');
    this.edLevels.set('3', 'Audiovisual');
    this.edLevels.set('4', 'Telecomunicaciones');
  }

  ngOnInit() {
  }

  clean(){
    this.name = '';
    this.lastname = '';
    this.carrera = '';
    this.birthday = '';
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
  