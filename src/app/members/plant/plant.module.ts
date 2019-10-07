import { IconsModule } from './../../icons/icons.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlantPage } from './plant.page';

const routes: Routes = [
  {
    path: '',
    component: PlantPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlantPage]
})
export class PlantPageModule { }
