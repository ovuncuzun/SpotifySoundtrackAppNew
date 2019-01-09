import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SpotifySoundtrackAppNew';
  public options={
    position:["top","center"],
    timeOut:750,
    showProgressBar:false,
    animate:"fromTop",
    theClass:"alert-success"
  }
}
