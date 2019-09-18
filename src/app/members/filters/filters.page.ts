import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {

  consumption: string[] = [];
  area: string[] = [];
  status: string[] = [];

  north: boolean;
  center: boolean;
  south: boolean;

  constructor(private plantService: PlantService, private router: Router) { }

  changeConsumption(ionButton) {
    const value = ionButton.el.id;
    console.log(value);

    if (this.consumption.includes(value)) {
      // Remove value if present
      this.consumption = this.consumption.filter(x => {
        return x !== value;
      });
    } else {
      // Else add it
      this.consumption.push(value);
    }

    console.log(this.consumption);
    console.log(ionButton);

    if (ionButton.color === 'tertiary') {
      ionButton.color = 'primary';
    } else {
      ionButton.color = 'tertiary';
    }
  }

  changeStatus(ionButton) {
    const value = ionButton.el.id;
    console.log(value);

    // Remove status if present
    if (this.status.includes(value)) {
      this.status = this.status.filter(x => {
        return x !== value;
      });
    } else {
      // Else add it
      this.status.push(value);
    }

    console.log(this.status);
    console.log(ionButton);

    if (ionButton.color === 'tertiary') {
      ionButton.color = 'primary';
    } else {
      ionButton.color = 'tertiary';
    }
  }

  applyFilters() {
    if (this.north) {
      this.area.push('North Italy');
    }
    if (this.center) {
      this.area.push('Center Italy');
    }
    if (this.south) {
      this.area.push('South Italy');
    }

    this.checkEmpty();

    this.plantService.setConsumptionFilters(this.consumption);
    this.plantService.setAreaFilters(this.area);
    this.plantService.setStatusFilters(this.status);

    this.router.navigate(['members', 'new-dashboard']);
  }

  checkEmpty() {
    if (this.consumption.length === 0) {
      this.consumption = ['Low', 'Medium', 'High'];
    }
    if (this.area.length === 0) {
      this.area = ['North Italy', 'Center Italy', 'South Italy'];
    }
    if (this.status.length === 0) {
      this.status = ['OFF', 'ON'];
    }
  }

  ngOnInit() {

  }
}
