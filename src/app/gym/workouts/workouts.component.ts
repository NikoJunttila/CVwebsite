import { Component, OnInit } from '@angular/core';
import { Workouts } from '../workouts';
import { Plans } from './mock-plans';
import { GymService } from '../gym.service';
@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit {
plans : Workouts[] = []
constructor(private gymService: GymService){}
ngOnInit(): void {
    this.getPlans()
}
getPlans():void {
  this.gymService.getPlans()
    .subscribe(plans => this.plans = plans)
}

}
