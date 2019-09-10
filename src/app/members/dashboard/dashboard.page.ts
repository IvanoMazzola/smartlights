import { AuthenticationService } from './../../services/authentication.service';
import { FilterService } from './../../services/filter.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  items: any[] = [];

  constructor(private authService: AuthenticationService, private router: Router, private filterService: FilterService) {

  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.filterService.getPlants().then(plants => this.items = plants);
  }

  loadFilters() {
    this.router.navigate(['members', 'filters']);
  }

  logout() {
    this.authService.logout();
  }
}
