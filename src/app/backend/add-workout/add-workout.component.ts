import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { GymService } from 'src/app/gym/gym.service';
import {
  exerciseArray,
  legs,
  back,
  chestShoulder,
  arms,
  abs,
} from 'src/app/gym/maker/exercises';
import { dunno } from 'src/app/gym/workouts';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';




@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent implements OnInit, OnDestroy {
constructor(private fb:FormBuilder,private gym:GymService,public afAuth: AngularFireAuth, private firestore: AngularFirestore){
  this.user = null as any;
}
personal: string = '';
exercises = exerciseArray;
newWorkout: dunno[] = [];
subscribtions : any
emailLower : string = ""
user: Observable<any>;              // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

ngOnInit(): void {
this.subscribtions =  this.afAuth.authState.subscribe(user => {
  if (user) {
    this.emailLower = user.email?.toLowerCase() as string;
    this.user = this.firestore.collection('users').doc(this.emailLower).valueChanges();
  }})}
 ngOnDestroy(): void {
     this.subscribtions.unsubscribe()
 }


workout = this.fb.group({
  name: [''],
  description: [''],
  days: [''],
  id:[],
  madeBy:"",
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
  setsDone: new FormControl(0),
  done: new FormControl(false),
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
  const randomNum : any = Math.floor(Math.random() * (9999999 - 11111) + 11111 )
this.workout.value.id = randomNum
this.workout.value.madeBy = this.emailLower
this.gym.addWorkoutForNormies(this.workout.value,this.emailLower)  
this.workout.reset()
}
onAdminSubmit() {
  console.log(this.emailLower)
  const randomNum : any = Math.floor(Math.random() * (9999999 - 11111) + 11111 )
this.workout.value.id = randomNum
this.workout.value.madeBy = this.emailLower
this.gym.addWorkout(this.workout.value)  
this.workout.reset()
}

categories(index:number) {
  const sb = document.getElementById(`categories${index}`) as HTMLInputElement | null;
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
addExerciseNew(plan: any,index:number) {
  let inputElement = document.getElementById(`name${index}`) as any;
  let inputValue = inputElement.value;    
  const group = new FormGroup({
      sets: new FormControl(5),
      reps: new FormControl("8"),
      exercise: new FormControl(inputValue),
      setsDone: new FormControl(0),
      done: new FormControl(false),
    });
    this.getExercises(plan).push(group)
    inputElement.value = ""
}
setsPlus(exercise: any) {
  if (exercise.sets !== undefined) {
    exercise.sets++;
  }
}
setsMinus(exercise: any) {
  if (exercise.sets !== undefined) {
    exercise.sets--;
  }
}
repsMinus(exercise: any) {
  if (exercise.reps !== undefined) {
    exercise.reps--;
  }
}

repsPlus(exercise: any) {
  if (exercise.reps !== undefined) {
    exercise.reps++;
  }
}
 /* delete(exercise: any) {
  let index = this.workout.plan.exercises.indexOf(exercise);
  this.workout.plan.exercises.splice(index, 1);
}  */
getName(plan: any,exercises: string) {
  const group = new FormGroup({
    sets: new FormControl(5),
    reps: new FormControl("8"),
    exercise: new FormControl(exercises),
    setsDone: new FormControl(0),
    done: new FormControl(false),
  });
  this.getExercises(plan).push(group)
  this.personal = ""
}


}


