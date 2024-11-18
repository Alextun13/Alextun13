import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario = {
    nombreCompleto: '',
    identificacion: '',
    curso: ''
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Usuario a registrar:', this.usuario);
    // Aquí puedes agregar la lógica para guardar el usuario
    // Después de guardar, redirige al login
    this.router.navigate(['/login']);
  }
}