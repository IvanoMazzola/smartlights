import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from './../../services/toast.service';
import { db } from './../../appdb';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private authService: AuthenticationService, private toastService: ToastService) {

  }

  ngOnInit() {

  }

  async login() {
    /* db.table('users').toArray().then(data => {
      console.log(JSON.stringify(data));
    }); */

    const res = this.authService.validate(this.email, this.password);
    res.count().then(x => {
      if (x === 0) {
        this.toastService.showToast('User not found', 'danger');
      } else {
        res.each(user => {
          console.log('Found: ' + user.email + ' with password ' + user.password);
        });
      }
    });
  }

}
