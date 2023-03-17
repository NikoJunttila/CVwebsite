import { Component, OnInit } from '@angular/core';
import {singleWorkout} from "../gym/workouts"
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { GymService } from '../gym/gym.service';
import { AuthService } from '../services/auth.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  user: Observable<any>;              // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

  constructor(public afAuth: AngularFireAuth, private datePipe: DatePipe,
    private firestore: AngularFirestore,private authser:AuthService,private gymService:GymService) {
      this.user = null as any;
  }
  done : any
  emailLower: any = ''; 
  workoutToShow : singleWorkout |undefined
  timeSpent : number | undefined
  showFull(index:number){
    this.workoutToShow = this.done[index]
  }
  ngOnInit(): void {
      this.afAuth.authState.subscribe(user => {
          if (user) {
              this.emailLower = user.email?.toLowerCase();
              this.user = this.firestore.collection('users').doc(this.emailLower).valueChanges();
          }
          this.gymService.getCompletedWorkouts(this.emailLower).subscribe(donez => 
            this.done = donez
          )
          setTimeout(() => {
            this.aproxTimeAtGym()
            this.sortLatestFirst()
          }, 700);
      });
  }

sortLatestFirst(){
  this.done.sort((a:any, b:any) => b.date - a.date) 
}
sortOldestFirst(){
  this.done.sort((a:any, b:any) => a.date - b.date)
}


aproxTimeAtGym(){
 let total : number = 0
  this.done.forEach((element:any) => {
   total +=  element.aproxTime
  }); 
  this.timeSpent = total
}
}
