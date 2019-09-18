import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'new-dashboard', loadChildren: './new-dashboard/new-dashboard.module#NewDashboardPageModule' },
  { path: 'filters', loadChildren: './filters/filters.module#FiltersPageModule' },
  { path: 'plant', loadChildren: './plant/plant.module#PlantPageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
