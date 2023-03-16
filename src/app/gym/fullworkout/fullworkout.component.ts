import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workouts } from '../workouts';
import { GymService } from '../gym.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-fullworkout',
  templateUrl: './fullworkout.component.html',
  styleUrls: ['./fullworkout.component.css']
})
export class FullworkoutComponent implements OnInit, OnDestroy {
constructor (private route:ActivatedRoute, private gymService : GymService,private location: Location){}

private subscription!: Subscription;

workout : Workouts | undefined 

ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.subscription = this.gymService.getWorkoutFromFirestore('workouts', `${id}`)
  .subscribe(data => {
    this.workout = data;
  })
}
setWorkout(workoutNew:any){
localStorage.setItem('workout2', JSON.stringify(workoutNew));
localStorage.setItem('initWorkout2', JSON.stringify(workoutNew));
}
goBack(): void {
  this.location.back();
}
ngOnDestroy(): void {
  if (this.subscription){
    this.subscription.unsubscribe()
  }
}
}
