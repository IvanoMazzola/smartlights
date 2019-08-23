import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';

const userOne = ' { "email": "dabbraccio.francesco@gmail.com", "name": "Francesco", "password": "ivano" }';
const jsonUser = JSON.parse(userOne);

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

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

  validate(mail: string, password: string) {
    const userMail = jsonUser.email;
    const userPassword = jsonUser.password;
    if (mail !== userMail) {
      return false;
    } else {
      if (password !== userPassword) {
        return false;
      } else {
        this.login();
        return true;
      }
    }
  }

  login() {
    return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
