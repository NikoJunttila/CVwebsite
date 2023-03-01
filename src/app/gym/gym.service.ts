import { Injectable } from '@angular/core';
import { Workouts } from './workouts';
import { Plans } from './workouts/mock-plans';
import { Observable, of } from 'rxjs';
import { rlyDunno } from './workouts';
import { gymWorkout } from './fullworkout/showWorkout';
import { guide } from './workouts';
import { info } from './info/exercises';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  getPlans() : Observable<Workouts[]>{
    const plans = of(Plans)
    return plans;
  }
  getPlan(id:number): Observable <Workouts> {
    const workout = Plans.find(h => h.id === id)!;
    return of(workout)
  } 
  getWorkout(id:number): Observable <rlyDunno> {
    const workout = gymWorkout.find(h => h.id === id)!;
    return of(workout)
  } 
  getExercise(name:string): Observable <guide> {
    const exercise = info.find(h => h.name.toLowerCase() === name.toLowerCase())!;
    return of(exercise)
  } 
  constructor() { }
}
