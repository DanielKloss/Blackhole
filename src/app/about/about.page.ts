import { Component } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LaunchReview } from '@ionic-native/launch-review/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'

@Component({
    selector: 'app-about',
    templateUrl: 'about.page.html',
    styleUrls: ['about.page.scss']
})

export class AboutPage {
    versionNumber: string;
    platformIsBrowser: boolean;

    constructor(private appVersion: AppVersion, private iab: InAppBrowser, public platform: Platform, public rate: LaunchReview, private screenOrientation: ScreenOrientation) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        if (this.platform.is('cordova')) {
            // You're on a device 
            appVersion.getVersionNumber().then(version => this.versionNumber = version);
            this.platformIsBrowser = false;
        } else {
            // You're testing in browser
            this.versionNumber = "Browser Version";
            this.platformIsBrowser = true;
        }
    }

    rateAndReview() {
        if (!this.platformIsBrowser) {
            if (this.rate.isRatingSupported()) {
                this.rate.rating().then(() => console.log('Successfully launched rating dialog'));
            }
        }
    }
}
