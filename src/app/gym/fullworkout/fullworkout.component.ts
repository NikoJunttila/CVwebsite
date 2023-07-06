import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workouts } from '../workouts';
import { GymService } from '../gym.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-fullworkout',
  templateUrl: './fullworkout.component.html',
  styleUrls: ['./fullworkout.component.css']
})
export class FullworkoutComponent implements OnInit, OnDestroy {
constructor (private route:ActivatedRoute, private gymService : GymService,private location: Location,public afAuth: AngularFireAuth, private firestore: AngularFirestore,private router: Router){
  this.user = null as any;
}

private subscription!: Subscription;
private subscription2!: Subscription;

workout : any | undefined 
emailLower : string = ""
user: Observable<any>;   

ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.subscription = this.gymService.getWorkoutFromFirestore('workouts', `${id}`)
  .subscribe(data => {
    this.workout = data;
    console.log(this.workout)
  })
  this.subscription2 = this.afAuth.authState.subscribe(user => {
    if (user) {
      this.emailLower = user.email?.toLowerCase() as string;
      this.user = this.firestore.collection('users').doc(this.emailLower).valueChanges();
    }})
  }

copyWorkout(){
  const randomNum : number = Math.floor(Math.random() * (99999 - 11111) + 11111 )
  this.workout.madeBy = this.emailLower
this.workout.id = randomNum
this.gymService.addWorkoutForNormies(this.workout,this.emailLower)
setTimeout(() => {
  this.router.navigate([`/gym/personal/${randomNum}`])
}, 1000);
} 

setWorkout(workoutNew:any){
localStorage.setItem('workout2', JSON.stringify(workoutNew));
localStorage.setItem('initWorkout2', JSON.stringify(workoutNew));
localStorage.removeItem("myDate2")
}
goBack(): void {
  this.location.back();
}
ngOnDestroy(): void {
  if (this.subscription){
    this.subscription.unsubscribe()
    this.subscription2.unsubscribe()
  }
}
}
