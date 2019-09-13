import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Router } from '@angular/router';

declare var google;

@Component({
  selector: 'app-plant',
  templateUrl: './plant.page.html',
  styleUrls: ['./plant.page.scss'],
})


export class PlantPage implements OnInit, AfterContentInit {
  map;
  item: any = [];
  @ViewChild('mapElement', {static: true}) mapElement;

  constructor(private plantService: PlantService, private router: Router) {
    this.item = this.plantService.getItem();
  }


  ngOnInit() {
  }
  ngAfterContentInit(): void {
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
  }

}
