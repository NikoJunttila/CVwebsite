import { Component, OnInit, OnDestroy } from '@angular/core';
import { Workouts } from '../workouts';
import { Subscription } from 'rxjs';
import { GymService } from '../gym.service';
@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit, OnDestroy {
private subscription!: Subscription;

plans : Workouts[] = []

constructor(private gymService: GymService){}

ngOnInit(): void {
 this.subscription = this.gymService.getWorkouts()
  .subscribe(plans => this.plans = plans)
}

ngOnDestroy(): void {
  if (this.subscription){
    this.subscription.unsubscribe()
  }
}

}
