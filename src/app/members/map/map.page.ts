import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { PlantService } from 'src/app/services/plant.service';
import { Router } from '@angular/router';

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
  constructor(private plantS: PlantService, private router: Router) {
  }

  ngOnInit() {

  }
  ngAfterContentInit(): void {
    this.plantS.getPlants().then(plants => {
      this.items = plants;
      this.mapInit();
      this.setMarkers();
    });

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
      const contentString = '<b>Plant ' + element.id + '</b>' + '<br><b>Area:</b> ' + element.area + '<br><b>City:</b> ' + element.city + '<br><b>Address:</b> ' + element.address;
      const infoWindow = new google.maps.InfoWindow({
        content: contentString,
      });
      google.maps.event.addListener(marker, 'click', () => {
        // infoWindow.open(this.map, marker);
        this.plantS.setItem(element);
        this.router.navigate(['members', 'plant']);
      });

    }
  }
}

