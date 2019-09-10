import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { Router } from '@angular/router';
import { IonButton } from '@ionic/angular';

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

  constructor(private filterService: FilterService, private router: Router) { }

  changeConsumption(ionButton) {
    const value = ionButton.el.id;
    console.log(value);
    if (this.consumption.includes(value)) {
      this.consumption = this.consumption.filter(x => {
        return x !== value;
      });
    } else {
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
    if (this.status.includes(value)) {
      this.status = this.status.filter(x => {
        return x !== value;
      });
    } else {
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
    this.filterService.changeConsumption(this.consumption);
    this.filterService.changeArea(this.area);
    this.filterService.changeStatus(this.status);
    /* localStorage.setItem('consumption', JSON.stringify(this.consumption));
    console.log('Ivano ' + JSON.stringify(this.consumption)); */
    this.router.navigate(['members', 'dashboard']);
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
    /* console.log('Init filters page');
    const cons = localStorage.getItem('consumption');
    console.log('Federico ' + JSON.parse(cons));
    this.consumption = JSON.parse(cons); */
  }
}
