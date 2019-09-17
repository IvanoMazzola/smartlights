import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Router } from '@angular/router';
import { ToastService } from './../../services/toast.service';

declare var google;

@Component({
  selector: 'app-plant',
  templateUrl: './plant.page.html',
  styleUrls: ['./plant.page.scss'],
})


export class PlantPage implements OnInit, AfterContentInit {
  map;
  item: any = [];
  @ViewChild('mapElement', { static: true }) mapElement;

  constructor(private plantService: PlantService, private router: Router, private toastService: ToastService) {
    this.item = this.plantService.getItem();
  }

  ngOnInit() {
  }
  ngAfterContentInit(): void {
    this.mapInit();
  }
  mapInit() {
    const pos = new google.maps.LatLng(this.item.lat, this.item.long);
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: pos,
        zoom: 13
      });
    const marker = new google.maps.Marker({
      position: pos
    });
    marker.setMap(this.map);
  }

  updateStatus(item) {
    console.log(item);
    if (item.connection) {
      this.plantService.updateStatus(item).then(updated => {
        if (updated) {
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
        if (!item.connection) {
          this.item.connection = true;
        } else {
          this.item.connection = false;
        }
        console.log('Status correctly updated');
      } else {
        console.log('ERROR status not updated');
      }
    });
  }

}
