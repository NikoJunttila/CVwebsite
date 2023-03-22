import { Component, OnInit, OnDestroy } from '@angular/core';
import { Workouts } from '../workouts';
import { Subscription } from 'rxjs';
import { GymService } from '../gym.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.css']
})
export class WorkoutsComponent implements OnInit, OnDestroy {
private subscription!: Subscription;
private subscription2!: Subscription;


plans : Workouts[] = []
userPlans : any = []
constructor(private gymService: GymService,public afAuth: AngularFireAuth){}

ngOnInit(): void {
 this.subscription = this.gymService.getWorkouts()
  .subscribe(plans =>{
   this.plans = plans
   setTimeout(() => {
    this.plans.sort((a:any, b:any) => a.sort - b.sort) 
  }, 500); 
}
   )
  this.subscription2 =  this.afAuth.authState.subscribe(user => {
    if (user) {
      const emailLower = user.email?.toLowerCase() as string;
      this.gymService.getPersonalWorkouts(emailLower).subscribe(workouts => {
        if(workouts){
          this.userPlans = workouts
       
        }
      })
    }})
}
test(){
  console.log(this.userPlans)
}


ngOnDestroy(): void {
  if (this.subscription){
    this.subscription.unsubscribe()
    this.subscription2.unsubscribe()
  }
}

}
