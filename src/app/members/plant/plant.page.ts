import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { PlantService } from '../../services/plant.service';
import { Router } from '@angular/router';
import { ToastService } from './../../services/toast.service';
import * as HighCharts from 'highcharts';

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

    const myChart = HighCharts.chart('lastWeek', {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Consumption (last week)'
      },
      xAxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        title: {
          text: 'kWh'
        }
      },
      series: [{
        name: 'Lights',
        type: undefined,
        data: [123, 104, 135, 96, 102, 90, 30]
      }]
    });

    const lastMonth = HighCharts.chart('lastMonth', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Consumption (last month)'
      },
      xAxis: {
        categories: [
          'Week 1',
          'Week 2',
          'Week 3',
          'Week 4'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'kWh'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} kWh</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Min',
        type: undefined,
        color: '#00a4ff',
        data: [30, 25, 50, 35]

      }, {
        name: 'Avg',
        type: undefined,
        color: '#a1a1a1',
        data: [107, 110, 120, 109]
      }, {
        name: 'Max',
        color: '#0078ff',
        type: undefined,
        data: [130, 135, 170, 121]

      }]
    });

    const sixMonths = HighCharts.chart('sixMonths', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Consumption (last six months)'
      },
      xAxis: {
        categories: [
          'April',
          'May',
          'June',
          'July',
          'August',
          'September'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'kWh'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} kWh</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Min',
        type: undefined,
        color: '#00a4ff',
        data: [30, 25, 50, 35, 20, 30]

      }, {
        name: 'Avg',
        type: undefined,
        color: '#a1a1a1',
        data: [107, 110, 120, 109, 99, 103]
      }, {
        name: 'Max',
        color: '#0078ff',
        type: undefined,
        data: [130, 135, 170, 121, 118, 130]

      }]
    });
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
