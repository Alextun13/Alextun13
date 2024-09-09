import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  modeloUsuario : String = "";
  modeloContrasena : String = "";

  constructor() { 
    console.log("Pagina login iniciada")
  }

  ngOnInit() {
  }

  validarCredenciales() {
    console.log(this.modeloUsuario);
    console.log(this.modeloContrasena);

  }
}
