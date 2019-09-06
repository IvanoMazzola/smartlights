import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { db } from '../appdb';

const TOKEN_KEY = 'auth-token';
let token = '';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  getTokenString() {
    return token;
  }

  checkToken() {
    if (token !== '') {
      this.authenticationState.next(true);
    }
  }

  validate(mail: string, pwd: string) {
    return db.users
      .where({ email: mail, password: pwd });
  }

  async login(email: string) {
    token = email;
    this.authenticationState.next(true);
  }

  async logout() {
    token = '';
    this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
