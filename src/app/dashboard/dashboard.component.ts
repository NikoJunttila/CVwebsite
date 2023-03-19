import { Component, OnInit, OnDestroy } from '@angular/core';
import {singleWorkout} from "../gym/workouts"
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { GymService } from '../gym/gym.service';
import { AuthService } from '../services/auth.service';
import { DatePipe,Location } from '@angular/common';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: Observable<any>;              // Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

  subscribtions : any
  

  constructor(public afAuth: AngularFireAuth, private datePipe: DatePipe, private location:Location,
    private firestore: AngularFirestore,private authser:AuthService,private gymService:GymService) {
      this.user = null as any;
  }
  done : any
  emailLower: any = ''; 
  workoutToShow : singleWorkout |undefined
  timeSpent : number | undefined
  imgURL : string = ""
  profImages : any[] = []

  goBack(){
    this.location.back()
  }

  showFull(index:number){
    this.workoutToShow = this.done[index]
  }
  ngOnInit(): void {
    this.subscribtions =  this.afAuth.authState.subscribe(user => {
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
            this.user.subscribe(
              data => {
                this.imgURL = data.photoURL
              },
              error => {
                console.error(error);
              },
              () => {
                console.log('Observable complete');
              }
            );
          }, 700);
        });
        this.getProfImgs().subscribe(imgs => {
          this.profImages = imgs
        })
  }

  updateProfileImage(newImage: string) {
  const subscribeImg : any = this.user.subscribe(user => {
      if (user) {
          // Update the photoURL field in Firestore
         this.firestore.doc(`users/${this.emailLower}`).update({
          photoURL: newImage
        });
        subscribeImg.unsubscribe();
      }
    });
  }
  getProfImgs(): Observable<any[]>{
    let data : any = [];
    const collection = this.firestore.collection<any[]>('profileImgFiles');
    collection.get().subscribe(snapshot => {
      snapshot.forEach((res) => {
         data.push(res.data());
       });
    });
    const images = of(data)
     return images
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
ngOnDestroy(): void {
    this.subscribtions.unsubscribe()
}

}
