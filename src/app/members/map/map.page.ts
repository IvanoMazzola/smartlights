import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { PlantService } from 'src/app/services/plant.service';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, AfterContentInit {

  map;
  items: any[] = [];
  markers: any[] = [];


  @ViewChild('mapElement', { static: true }) mapElement;
  constructor(private plantS: PlantService) {
    this.items = plantS.getAll();
    console.log(this.items.length);
  }

  ngOnInit() {

  }
  ngAfterContentInit(): void {
    this.mapInit();
    this.setMarkers();

  }
  mapInit() {
    const currentPos = new google.maps.LatLng(41.890942, 12.503780);
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: currentPos,
        zoom: 12
      });

  }
  setMarkers() {
    for (const element of this.items) {
      const markPos = new google.maps.LatLng(element.lat, element.long);
      const marker = new google.maps.Marker({
        position: markPos
      });
      this.markers.push(marker);
      marker.setMap(this.map);
      /*
      const infoWindow = new google.maps.InfoWindow({
        content: {}
      });
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
      */
    }
  }
}

