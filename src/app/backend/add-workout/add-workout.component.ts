import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { GymService } from 'src/app/gym/gym.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent {
constructor(private fb:FormBuilder,private gym:GymService){}


workout = this.fb.group({
  name: [''],
  description: [''],
  days: [''],
  id:[],
  plans: this.fb.array([
    this.fb.group({
      aproxTime: [60],
      day: [''],
      date:[""],
       exercises: this.fb.array([
        this.fb.group({
          sets: [5],
          reps: ["8"],
          exercise: [''],
          setsDone:[0],
          done:[false]
        })
      ]) 
    })
  ])
});

plans = (this.workout.get('plans') as FormArray)

getExercises(plan: any) {
return (plan.get('exercises') as FormArray)
}

addExercise(plan: any) {
const group = new FormGroup({
  sets: new FormControl(5),
  reps: new FormControl("8"),
  exercise: new FormControl(''),
});
this.getExercises(plan).push(group)
}

addPlan() {
const planGroup = new FormGroup({
  aproxTime: new FormControl(60),
  day: new FormControl(""),
  date:new FormControl(""),
  exercises: this.fb.array([
    this.fb.group({
      sets: new FormControl(5),
      reps: new FormControl(8),
      setsDone:[0],
      done:[false],
      exercise: new FormControl("")
    })
  ]) 
})
this.plans.push(planGroup)
}
onSubmit() {
 const randomNum : any = Math.floor(Math.random() * (99999 - 11111) + 11111 )
this.workout.value.id = randomNum
this.gym.addWorkout(this.workout.value) 
}
}


