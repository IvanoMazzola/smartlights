import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {

  consumption: string[] = [];
  area: string[] = [];
  status: string[] = [];

  constructor() { }

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
    if (ionButton.color === 'primary') {
      ionButton.color = 'secondary';
    } else {
      ionButton.color = 'primary';
    }
  }

  applyFilters() {
    
  }

  ngOnInit() {
  }

}
