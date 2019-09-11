import { AuthenticationService } from './../../services/authentication.service';
import { FilterService } from './../../services/filter.service';
import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { db } from '../../appdb';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  items: any[] = [];

  searchName: string;

  consumptionFilter: string[] = [];
  areaFilter: string[] = [];
  statusFilter: string[] = [];

  constructor(private authService: AuthenticationService, private router: Router, private filterService: FilterService, private toastService: ToastService) {

  }

  ngOnInit() {

  }

  filterValues() {
    console.log('Nome ' + this.searchName);
  }

  removeConsumption(value) {
    console.log('Consumption filter to remove ' + value);
    const newFilter = this.consumptionFilter.filter(x => {
      return x !== value;
    });
    this.filterService.changeConsumption(newFilter);
    this.consumptionFilter = newFilter;
    this.filterService.getPlants().then(plants => this.items = plants);
  }

  updateStatus(event) {
    console.log(event);
    const plantID = event.srcElement.id;
    this.items.forEach(x => {
      console.log(x);
      // tslint:disable-next-line: triple-equals
      if (x.id == plantID) {
        console.log('Status ' + x.status);
        if (x.status === 'OFF') {
          db.table('plants').update(x.id, { status: 'ON' }).then(updated => {
            if (updated) {
              console.log('Aggiornato');
              x.status = 'ON';
            }
          });
        } else {
          db.table('plants').update(x.id, { status: 'OFF' }).then(updated => {
            if (updated) {
              console.log('Aggiornato');
              x.status = 'OFF';
            }
          });
        }
      }
    });
  }


  ionViewWillEnter() {
    if (this.filterService.consumption.length !== 3) {
      this.consumptionFilter = this.filterService.consumption;
    }
    this.filterService.getPlants().then(plants => this.items = plants);
  }

  loadFilters() {
    this.router.navigate(['members', 'filters']);
  }

  logout() {
    this.authService.logout();
  }
}
