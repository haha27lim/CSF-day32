import { Component } from '@angular/core';
import { Activities } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // Method logs a message to the console with the details of the activities argument passed to it
  processNewActivity(activities: Activities) {
    console.info('>>>> process activities: ', activities)
  }
}
