import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  items: any[] = [];

  consumptionFilter: string[] = [];
  areaFilter: string[] = [];
  statusFilter: string[] = [];

  constructor(private router: Router, private toastService: ToastService, private plantService: PlantService) {
    this.plantService.getPlants().then(plants => this.items = plants);
  }

  ngOnInit() {
  }

  updateStatus(item) {
    console.log(item);
    if (item.connection) {
      this.plantService.updateStatus(item).then(updated => {
        if (updated) {
          this.plantService.getFilteredPlants().then(x => {
            this.items = x;
          });
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
        this.plantService.getFilteredPlants().then(x => {
          this.items = x;
        });
        console.log('Status correctly updated');
      } else {
        console.log('ERROR status not updated');
      }
    });
  }

  plantDetails(item) {
    this.plantService.setItem(item);
    this.router.navigate(['members', 'plant']);
  }

}
