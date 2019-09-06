import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { db } from '../../appdb';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  items: any[] = [];

  constructor(private authService: AuthenticationService) {
    const res = db.plants
    .where({ user: authService.getTokenString() })
    .toArray(plants => {
      this.items = plants;
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
