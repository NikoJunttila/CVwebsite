import { Injectable } from '@angular/core';
import { Workouts } from './workouts';
import { Observable, of } from 'rxjs';
import { rlyDunno } from './workouts';
import { map } from 'rxjs/operators';
import { guide } from './workouts';
import { info } from './info/exercises';

import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
/* import { doc, getDoc } from "firebase/firestore";*/
import * as firebase from 'firebase/app';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class GymService {
  constructor(private afs: AngularFirestore){}

  addWorkout(workout:any){ 
    this.afs.doc("/workouts/"+ workout.id).set(workout)
    .then(() => {
        alert(`added ${workout.name}`)
    })
     .catch(error => {
        console.log(error)
        alert(error)
    }) 
    }
addWorkoutForNormies(workout:any,emailLower:string){
  this.afs.collection('users').doc(emailLower).collection('addedWorkouts').doc(`${workout.id}`).set(workout);
  this.afs.doc("/workoutsPersonal/"+ workout.id).set(workout)
  .then(() => {
      alert(`added ${workout.name}`)
  })
   .catch(error => {
      console.log(error)
      alert(error)
  }) 
}

getPersonalWorkouts(userEmail : string): Observable<any[]>{
  let data : any = [];
  const collection = this.afs.collection<any[]>('users').doc(userEmail).collection("addedWorkouts");
  collection.get().subscribe(snapshot => {
    snapshot.forEach((res) => {
      data.push(res.data());
    });
  });
  const workouts = of(data)
return workouts;
}

//all workouts
    getWorkouts(): Observable<any[]>{
      let data : any = [];
      const collection = this.afs.collection<any[]>('workouts');
      collection.get().subscribe(snapshot => {
        snapshot.forEach((res) => {
          data.push(res.data());
        });
      });
      const workouts = of(data)
    return workouts;
    }
    //single
    getWorkoutFromFirestore(collectionName: string, documentId: string): Observable<any> {
      return this.afs.collection(collectionName).doc(documentId)
        .get()
        .pipe(
          map(doc => {
            if (doc.exists) {
              return doc.data();
            } else {
              return null;
            }
          })
        );
    }
    
    //constant stream of data. not good here
   /*  getWorkoutFromFirestore(collectionName: string, documentId: string): Observable<any> {
      return this.afs.collection(collectionName).doc(documentId)
        .snapshotChanges()
        .pipe(
          map(doc => {
            if (doc.payload.exists) {
              return doc.payload.data();
            } else {
              return null;
            }
          })
        );
    } */


    //add completed workouts
     addCompletedWorkout(emailLower: string, workout: any) {
      const randomNum = Math.floor(Math.random()* (999999 - 111111) + 111111 )
      this.afs.collection('users').doc(emailLower).collection('completedWorkouts').doc(`${randomNum}`).set(workout);
    } 
 //all completed exercises
    getCompletedWorkouts(emailLower:string): Observable<any[]>{
      let data : any = [];
      const collection = this.afs.collection<any[]>('users').doc(emailLower).collection('completedWorkouts')
      collection.get().subscribe(snapshot => {
        snapshot.forEach((res) => {
          data.push(res.data());
        });
      });
      const workouts = of(data)
    return workouts;
    }
 
 
   //info for exercise 
  getExercise(name:string): Observable <guide> {
    const exercise = info.find(h => h.name.toLowerCase() === name.toLowerCase())!;
    return of(exercise)
  } 
}
