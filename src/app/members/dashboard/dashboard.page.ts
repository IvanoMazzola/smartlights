import { AuthenticationService } from './../../services/authentication.service';
import { FilterService } from './../../services/filter.service';
import { Component, OnInit } from '@angular/core';
import { db } from '../../appdb';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  items: any[] = [];

  constructor(private authService: AuthenticationService, private router: Router, private filterService: FilterService) {
    /*const res = db.plants
    .where({ user: authService.getTokenString() })
    .toArray(plants => {
      this.items = plants;
    });*/
    console.log('Creata dashboard');
    // this.filterService.getPlants().then(plants => this.items = plants);
  }

  ngOnInit() {
    console.log('Init dashboard');
    // this.filterService.getPlants().then(plants => this.items = plants);
  }

  ionViewWillEnter() {
    console.log('Entering dashboard');
    this.filterService.getPlants().then(plants => this.items = plants);
  }

  loadFilters() {
    this.router.navigate(['members', 'filters']);
  }

  logout() {
    this.authService.logout();
  }
}
