import { Component } from '@angular/core';
import { Plans } from './mock-plans';
@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent {
plans = Plans

}
