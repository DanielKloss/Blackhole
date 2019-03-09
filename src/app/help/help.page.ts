import { Component } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx'

@Component({
    selector: 'app-help',
    templateUrl: 'help.page.html',
    styleUrls: ['help.page.scss']
})

export class HelpPage {
    constructor(private screenOrientation: ScreenOrientation) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }
}
