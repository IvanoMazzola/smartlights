import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from './../../services/toast.service';

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
    const res = this.authService.validate(this.email, this.password);
    if (!res) {
      this.toastService.showToast('Credentials not valid', 'danger');
    }
  }

}
