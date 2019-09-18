import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/authentication.service';
import { PlantService } from '../../services/plant.service';
import { PlantPage } from '../plant/plant.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.page.html',
  styleUrls: ['./new-dashboard.page.scss'],
})
export class NewDashboardPage implements OnInit {
  items: any[] = [];

  consumptionFilter: string[] = [];
  areaFilter: string[] = [];
  statusFilter: string[] = [];

  searchName: string;

  constructor(private router: Router, private authService: AuthenticationService, private plantService: PlantService) {
    this.plantService.getPlants().then(plants => this.items = plants);
  }

  ngOnInit() {
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
    this.plantService.setConsumptionFilters(newFilter);
    this.plantService.getFilteredPlants().then(plants => this.items = plants);
  }

  removeArea(value) {
    console.log('Area filter to remove ' + value);
    let newFilter = this.areaFilter.filter(x => {
      return x !== value;
    });
    if (newFilter.length === 0) {
      newFilter = ['North Italy', 'Center Italy', 'South Italy'];
    }
    this.areaFilter = newFilter;
    this.plantService.setAreaFilters(newFilter);
    this.plantService.getFilteredPlants().then(plants => this.items = plants);
  }

  removeStatus(value) {
    console.log('Status filter to remove ' + value);
    let newFilter = this.statusFilter.filter(x => {
      return x !== value;
    });
    if (newFilter.length === 0) {
      newFilter = ['OFF', 'ON'];
    }
    this.statusFilter = newFilter;
    this.plantService.setStatusFilters(newFilter);
    this.plantService.getFilteredPlants().then(plants => this.items = plants);
  }

  ionViewWillEnter() {
    this.consumptionFilter = this.plantService.getFilters()[0];
    this.areaFilter = this.plantService.getFilters()[1];
    this.statusFilter = this.plantService.getFilters()[2];
    this.plantService.getFilteredPlants().then(plants => this.items = plants);
  }

  loadFilters() {
    this.router.navigate(['members', 'filters']);
  }

  filterValues() {
    if (this.searchName === '') {
      this.plantService.getFilteredPlants().then(plants => this.items = plants);
    }
    this.items = this.items.filter(x => {
      return x.id === +this.searchName;
    });
    console.log('Nome ' + this.searchName);
  }

  logout() {
    this.authService.logout();
  }

}
