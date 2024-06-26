import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {
  exerciseArray,
  legs,
  back,
  chestShoulder,
  arms,
  abs,
} from './exercises';
import { EXERCISES } from '../workouts';

@Component({
  selector: 'app-maker',
  templateUrl: './maker.component.html',
  styleUrls: ['./maker.component.css'],
})
export class MakerComponent implements OnInit{
  personal: string = '';
  exercises = exerciseArray;
  newWorkout: EXERCISES[] = [];
  check : any = []
  show : boolean = false

  constructor(private router: Router) {}

  fullWorkout : any = {
    aproxTime: 60,
    day: "custom",
    exercises: []
  }

  ngOnInit(): void {
    this.check = JSON.parse(localStorage.getItem('workout') || '{}');
    if(Object.keys(this.check).length === 0){
      this.show = false
    }else{
      this.show = true 
    }
  }

  categories() {
    const sb = document.getElementById('categories') as HTMLInputElement | null;
    if (sb) {
      switch (sb.value) {
        case 'all':
          this.exercises = exerciseArray;
          break;
        case 'legs':
          this.exercises = legs;
          break;
        case 'back':
          this.exercises = back;
          break;
        case 'chest':
          this.exercises = chestShoulder;
          break;
        case 'arms':
          this.exercises = arms;
          break;
        case 'abs':
          this.exercises = abs;
          break;
      }
    }
  }
 
  start() {
    if(this.fullWorkout.exercises.length < 1){
      alert("add exercises before starting")
    }else {
    this.router.navigate(['/gym/lightweight']);
    localStorage.setItem('workout', JSON.stringify(this.fullWorkout));
    localStorage.setItem('initWorkout', JSON.stringify(this.fullWorkout));
    localStorage.removeItem("myDate2")
  }
  }
  addNew() {
    if(this.personal.length < 1){
      alert("type something before adding")
    }
    else{
    let object: any = {
      exercise: this.personal,
      sets: 3,
      reps: 8,
      setsDone: 0,
      done: false,
    };
    this.fullWorkout.exercises.push(object)
    this.personal = ""
  }
  }
  getName(exercises: string) {
    let object: any = {
      exercise: exercises,
      sets: 3,
      reps: 8,
      setsDone: 0,
      done: false,
    };
    /* this.newWorkout.push(object); */
    this.fullWorkout.exercises.push(object)
    this.personal = ""
  }
  setsPlus(exercise: EXERCISES) {
    if (exercise.sets !== undefined) {
      exercise.sets++;
    }
  }
  setsMinus(exercise: EXERCISES) {
    if (exercise.sets !== undefined) {
      exercise.sets--;
    }
  }
  repsMinus(exercise: EXERCISES) {
    if (exercise.reps !== undefined) {
      exercise.reps--;
    }
  }

  repsPlus(exercise: EXERCISES) {
    if (exercise.reps !== undefined) {
      exercise.reps++;
    }
  }
  delete(exercise: EXERCISES) {
    let index = this.fullWorkout.exercises.indexOf(exercise);
    this.fullWorkout.exercises.splice(index, 1);
  }
}
