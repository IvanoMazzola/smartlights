import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { faFilter } from '@fortawesome/pro-light-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private library: FaIconLibrary,
    private faConfig: FaConfig
  ) {
    this.library.addIcons(faFilter);
    this.faConfig.defaultPrefix = 'fal';
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['members', 'new-dashboard']);
        } else {
          this.router.navigate(['login']);
        }
      });

    });
  }
}
