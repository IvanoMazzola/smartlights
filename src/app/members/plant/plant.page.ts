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

  carmine: boolean;

  @ViewChild('mapElement', { static: true }) mapElement;

  constructor(private plantService: PlantService, private router: Router, private toastService: ToastService) {

  }

  ngOnInit() {
    this.item = this.plantService.getItem();
    if (this.item.status === 'OFF') {
      this.carmine = false;
    } else {
      this.carmine = true;
    }
  }

  ionViewWillEnter() {
    this.item = this.plantService.getItem();
    if (this.item.status === 'OFF') {
      this.carmine = false;
    } else {
      this.carmine = true;
    }
  }

  ngAfterContentInit(): void {
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      });
  }

  updateStatus(item) {
    console.log('Item ' + item);
    this.plantService.updateStatus(item).then(updated => {
      if (updated) {
        if (item.status === 'OFF') {
          item.status = 'ON';
        } else {
          item.status = 'OFF';
        }
        console.log('Status correctly updated');
      } else {
        console.log('ERROR status not updated');
      }
    });
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
