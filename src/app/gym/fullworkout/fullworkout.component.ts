import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workouts } from '../workouts';
import { GymService } from '../gym.service';
import { rlyDunno } from '../workouts';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fullworkout',
  templateUrl: './fullworkout.component.html',
  styleUrls: ['./fullworkout.component.css']
})
export class FullworkoutComponent implements OnInit {
constructor (private route:ActivatedRoute, private gymService : GymService,private location: Location){}
workout : Workouts | undefined 
workoutz : rlyDunno | undefined
ngOnInit(): void {
  this.getWorkout()
}
setWorkout(id:number){
this.gymService.getWorkout(id).subscribe(plan => this.workoutz = plan);
localStorage.setItem('workout2', JSON.stringify(this.workoutz));
localStorage.setItem('initWorkout2', JSON.stringify(this.workoutz));
}
getWorkout():void{
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.gymService.getPlan(id).subscribe(plan => this.workout = plan);
}
goBack(): void {
  this.location.back();
}
}
