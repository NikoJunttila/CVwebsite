import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workouts } from '../workouts';
import { GymService } from '../gym.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fullworkout-useradded',
  templateUrl: './fullworkout-useradded.component.html',
  styleUrls: ['./fullworkout-useradded.component.css']
})
export class FullworkoutUseraddedComponent  implements OnInit, OnDestroy {
  constructor (private route:ActivatedRoute, private gymService : GymService,private location: Location){}

  private subscription!: Subscription;
  
  workout : Workouts | undefined 
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.gymService.getWorkoutFromFirestore('workoutsPersonal', `${id}`)
    .subscribe(data => {
      this.workout = data;
    })
  }
  setWorkout(workoutNew:any){
  localStorage.setItem('workout2', JSON.stringify(workoutNew));
  localStorage.setItem('initWorkout2', JSON.stringify(workoutNew));
  sessionStorage.removeItem("myDate2")
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
