import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDashboardPage } from './new-dashboard.page';

const routes: Routes = [
    {
        path: 'new-dashboard',
        component: NewDashboardPage,
        children:
            [
                {
                    path: 'list',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../list/list.module#ListPageModule'
                            }
                        ]
                },
                {
                    path: 'map',
                    children:
                        [
                            {
                                path: '',
                                loadChildren: '../map/map.module#MapPageModule'
                            }
                        ]
                },
                {
                    path: '',
                    redirectTo: 'new-dashboard/list',
                    pathMatch: 'full'
                }
            ]
    },
    {
        path: '',
        redirectTo: 'new-dashboard/list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports:
        [
            RouterModule.forChild(routes)
        ],
    exports:
        [
            RouterModule
        ]
})
export class TabsPageRoutingModule { }
