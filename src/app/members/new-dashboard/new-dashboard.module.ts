import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewDashboardPage } from './new-dashboard.page';

import { TabsPageRoutingModule } from './tabs-routing.module';

const routes: Routes = [
  {
    path: '',
    component: NewDashboardPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewDashboardPage]
})
export class NewDashboardPageModule {}
