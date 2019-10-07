import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faFilter, faBuilding, faSearch, faLightbulbOn } from '@fortawesome/pro-light-svg-icons';
import { faCircle } from '@fortawesome/pro-solid-svg-icons';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class IconsModule {
  constructor(private library: FaIconLibrary) {
    this.library.addIcons(faFilter,
      faCircle,
      faBuilding,
      faLightbulbOn,
      faSearch
    );
  }
}
