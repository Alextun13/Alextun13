import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  loggedUser!: Login | undefined;

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

  findByUsername(u: string): Login | undefined {
    return this.logins.find(l => l.username === u)
  }

  registerLoggedUser(login: Login){
    this.loggedUser = login;
  }

  logout() {
    this.loggedUser = undefined;
  }

  isAuthenticated(): boolean {
    console.log(this.loggedUser)
    return this.loggedUser !== undefined
  }
}
