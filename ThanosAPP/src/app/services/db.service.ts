import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  logins: Login[] = [
    {
      username: 'admin',
      password: '1234'
    },
    {
      username: 'Alex',
      password: '1234'
    },
    {
      username: 'Pedro',
      password: '1234'
    },
    {
      username: 'Cata',
      password: '1235'
    }
  ]

  constructor(private router : Router) {   }

  canActivate(){
    console.log("Ejecutando guardian...")
    this.router.navigate(['login'])
    return false;
  }

  findByUsername(u: string): Login | undefined {
    return this.logins.find(l => l.username === u)
  }
}
