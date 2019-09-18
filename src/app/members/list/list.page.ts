import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  items: any[] = [];

  consumptionFilter: string[] = [];
  areaFilter: string[] = [];
  statusFilter: string[] = [];

  searchName: string;

  constructor(private router: Router, private toastService: ToastService, private plantService: PlantService) {
    this.plantService.getPlants().then(plants => this.items = plants);
    console.log('List constructor');
  }

  ngOnInit() {
    console.log('List onInit');
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

  updateStatus(item) {
    console.log(item);
    if (item.connection) {
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
    } else {
      this.toastService.showToast('Connect to plant first', 'warning');
    }
  }

  connectToPlant(item) {
    console.log(item);
    this.plantService.updateConnection(item).then(updated => {
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
    this.router.navigate(['members', 'filters'], {replaceUrl: true});
  }

  plantDetails(item) {
    this.plantService.setItem(item);
    this.router.navigate(['members', 'plant']);
  }

}
