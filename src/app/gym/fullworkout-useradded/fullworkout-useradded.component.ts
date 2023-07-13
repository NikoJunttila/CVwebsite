import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Workouts } from '../workouts';
import { GymService } from '../gym.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-fullworkout-useradded',
  templateUrl: './fullworkout-useradded.component.html',
  styleUrls: ['./fullworkout-useradded.component.css']
})
export class FullworkoutUseraddedComponent  implements OnInit, OnDestroy {
  constructor (private route:ActivatedRoute, private gymService : GymService,private location: Location, private messageService:MessageService,public afAuth: AngularFireAuth, private firestore: AngularFirestore){
    this.user = null as any;
  }
  private subscription!: Subscription;
  private subscription2!: Subscription;
  workout : Workouts | undefined
  editMode : boolean = false
  emailLower : string = ""
  user: Observable<any>;   

  tester(){
    console.log(this.workout)
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.gymService.getWorkoutFromFirestore('workoutsPersonal', `${id}`)
    .subscribe(data => {
      this.workout = data;
    })
    this.subscription2 = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.emailLower = user.email?.toLowerCase() as string;
        this.user = this.firestore.collection('users').doc(this.emailLower).valueChanges();
      }})
  }
  toggleEdit(){
    if(this.emailLower == this.workout!.madeBy)
    this.editMode = !this.editMode;
    else
    this.messageService.add("not made by you","error")
  }
  saveWorkout(){
    this.gymService.addWorkoutForNormies(this.workout,this.emailLower)
    this.messageService.add("updated workout","success")
    this.editMode = !this.editMode;
  }
  setWorkout(workoutNew:any,index:number){
  localStorage.setItem('workout2', JSON.stringify(workoutNew));
  localStorage.setItem('initWorkout2', JSON.stringify(workoutNew));
  sessionStorage.removeItem("myDate2")
  localStorage.removeItem("updateThis")
  if(this.emailLower == this.workout!.madeBy){
    const updateWorkout = {
      email: this.workout!.madeBy,
      id: this.workout!.id,
      index: index
    }
    localStorage.setItem('updateThis', JSON.stringify(updateWorkout));
  }
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
