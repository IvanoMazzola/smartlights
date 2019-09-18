import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.page.html',
  styleUrls: ['./new-dashboard.page.scss'],
})
export class NewDashboardPage implements OnInit {

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
