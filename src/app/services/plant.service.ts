import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { db } from '../appdb';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  consumptionFilter: string[] = ['Low', 'Medium', 'High'];
  areaFilter = ['North Italy', 'Center Italy', 'South Italy'];
  statusFilter = ['OFF', 'ON'];
  singlePlant: any;
  items: any[] = [];

  constructor(private authService: AuthenticationService) {

  }

  getPlants() {
    return db.plants
      .where('user').equals(this.authService.getTokenString())
      .toArray(plants => {
        this.items = plants;
        return plants;
      });
  }

  updateStatus(item) {
    console.log(db.plants.where({ id: item.id }));

    let newStatus = '';

    if (item.status === 'OFF') {
      newStatus = 'ON';
    } else {
      newStatus = 'OFF';
    }

    return db.plants.update(item.id, { status: newStatus });
  }

  updateConnection(item) {
    console.log(db.plants.where({ id: item.id }));

    let newConnection;

    if (!item.connection) {
      newConnection = true;
    } else {
      newConnection = false;
    }

    return db.plants.update(item.id, { connection: newConnection });
  }

  setConsumptionFilters(consumption) {
    this.consumptionFilter = consumption;
  }

  setAreaFilters(area) {
    this.areaFilter = area;
  }

  setStatusFilters(status) {
    this.statusFilter = status;
  }

  getFilters() {
    return [this.consumptionFilter, this.areaFilter, this.statusFilter];
  }

  getFilteredPlants() {
    return db.plants
      .where('user').equals(this.authService.getTokenString())
      .and(plant => this.consumptionFilter.includes(plant.consumption))
      .and(plant => this.areaFilter.includes(plant.area))
      .and(plant => this.statusFilter.includes(plant.status))
      .toArray(plants => {
        return plants;
      });
  }

  setItem(item) {
    this.singlePlant = item;
  }

  getItem() {
    return this.singlePlant;
  }
  getAll() {
    return this.items;
  }
}
