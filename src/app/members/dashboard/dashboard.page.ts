import { AuthenticationService } from './../../services/authentication.service';
import { FilterService } from './../../services/filter.service';
import { PlantService } from '../../services/plant.service';
import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  items: any[] = [];

  consumptionFilter: string[] = [];

  searchName: string;

  constructor(private plantService: PlantService, private authService: AuthenticationService, private router: Router, private toastService: ToastService) {
    this.plantService.getPlants().then(plants => this.items = plants);
  }

  ngOnInit() {

  }

  filterValues() {
    console.log('Nome ' + this.searchName);
  }

  updateStatus(item) {
    console.log(item);
    this.plantService.updateStatus(item).then(updated => {
      if (updated) {
        this.plantService.getFilteredPlants().then(x => {
          this.items = x;
        });
        console.log('Status correctly updated');
      } else {
        console.log('ERROR status not updated');
      }
    });
  }

  removeConsumption(value) {
    console.log('Consumption filter to remove ' + value);
    let newFilter = this.consumptionFilter.filter(x => {
      return x !== value;
    });
    if (newFilter.length === 0) {
      newFilter = ['Low', 'Medium', 'High'];
    }
    this.consumptionFilter = newFilter;
    this.plantService.setFilters(newFilter);
    this.plantService.getFilteredPlants().then(plants => this.items = plants);
  }

  ionViewWillEnter() {
    this.consumptionFilter = this.plantService.getFilters();
    this.plantService.getFilteredPlants().then(plants => this.items = plants);
  }

  loadFilters() {
    this.router.navigate(['members', 'filters']);
  }

  logout() {
    this.authService.logout();
  }
}
