import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { db } from '../appdb';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  consumption: string[] = ['Low', 'Medium', 'High'];
  area: string[] = ['North Italy', 'Center Italy', 'South Italy'];
  status: string[] = ['ON', 'OFF'];

  constructor(private authService: AuthenticationService) {
    console.log('Creato ' + this.consumption);
  }

  getPlants() {
    return db.plants
      .where('user').equals(this.authService.getTokenString())
      .and(plant => this.consumption.includes(plant.consumption))
      .and(plant => this.area.includes(plant.area))
      .and(plant => this.status.includes(plant.status))
      .toArray(plants => {
        return plants;
      });
  }

  changeConsumption(newConsumption: string[]) {
    this.consumption = newConsumption;
  }
}
