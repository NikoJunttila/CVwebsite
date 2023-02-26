import { Component } from '@angular/core';
import { Exercises } from './exercises';
import { EXERCISES } from '../workouts';

@Component({
  selector: 'app-maker',
  templateUrl: './maker.component.html',
  styleUrls: ['./maker.component.css']
})
export class MakerComponent {
personal : string = ""
exercises = Exercises
newWorkout : EXERCISES[] = []
test(){
  localStorage.setItem('workout', JSON.stringify(this.newWorkout));
  localStorage.setItem('initWorkout', JSON.stringify(this.newWorkout));
}
addNew(){
  let object:EXERCISES = {
    name:this.personal,
    sets: 3,
    reps: 8,
    setsDone: 0,
    done: false,
  }
this.newWorkout.push(object)
}
getName(exercises : string){
  let object:EXERCISES = {
    name:exercises,
    sets: 3,
    reps: 8,
    setsDone: 0,
    done: false,
  }
this.newWorkout.push(object)
}
setsPlus(exercise:EXERCISES){
if(exercise.sets !== undefined){
exercise.sets++
}
}
setsMinus(exercise:EXERCISES){
  if(exercise.sets !== undefined){
  exercise.sets--
  }
}
repsMinus(exercise:EXERCISES){
  if(exercise.reps !== undefined){
  exercise.reps--
}}

repsPlus(exercise:EXERCISES){
    if(exercise.reps !== undefined){
    exercise.reps++
  }
}
delete(exercise:EXERCISES){
let index = this.newWorkout.indexOf(exercise)
this.newWorkout.splice(index,1)
}
}
