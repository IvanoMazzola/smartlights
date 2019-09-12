import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { db } from '../appdb';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  consumptionFilter: string[] = ['Low', 'Medium', 'High'];

  constructor(private authService: AuthenticationService) {

  }

  getPlants() {
    return db.plants
      .where('user').equals(this.authService.getTokenString())
      .toArray(plants => {
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

  setFilters(consumption) {
    this.consumptionFilter = consumption;
  }

  getFilters() {
    return this.consumptionFilter;
  }

  getFilteredPlants() {
    return db.plants
      .where('user').equals(this.authService.getTokenString())
      .and(plant => this.consumptionFilter.includes(plant.consumption))
      .toArray(plants => {
        return plants;
      });
  }
}
