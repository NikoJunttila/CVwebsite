import { Component, OnInit, OnDestroy } from '@angular/core';
import {singleWorkout} from "../gym/workouts"
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of,finalize } from 'rxjs';
import { GymService } from '../gym/gym.service';
import { AuthService } from '../services/auth.service';
import { DatePipe,Location } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MessageService } from '../services/message.service';
import { tap } from 'rxjs/operators';





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
    private firestore: AngularFirestore,private authser:AuthService,private gymService:GymService, private storage:AngularFireStorage,
    private messageService:MessageService
    ) {
      this.user = null as any;
  }
  done : any = []
  emailLower: any = ''; 
  workoutToShow : singleWorkout | undefined
  timeSpent : number | undefined
  timeSpentHours : number | undefined
  timeSpentMinutes : number | undefined
  avg : number = 0

  imgURL : string = ""
  profImages : any[] = []
  prevIndex : number = -1

  fromDate : Date | undefined
  toDate : Date | undefined
  newArr : any = [];

  searchItems() {
    if (!this.fromDate || !this.toDate) {
      this.messageService.add("choose 2 dates","error")
      this.newArr = this.done;
      return this.done;
    }
    
    this.newArr = this.done.filter((item : any) => {
    const date = item.date.toMillis()
      const from = this.fromDate?.getTime();
      const to = this.toDate?.getTime();
      console.log((!from || date >= from) && (!to || date <= to))
 
      return (!from || date >= from) && (!to || date <= to);
    })
    this.aproxTimeAtGym()

  }
resetArr(){
  this.newArr = this.done;
}

  goBack(){
    this.location.back()
  }

  showFull(index:number){
    if(this.prevIndex == index){
      this.workoutToShow = undefined
      this.prevIndex = -1
    } else {
    this.prevIndex = index
    this.workoutToShow = this.done[index]
  }
  }
  ngOnInit(): void {
    this.subscribtions =  this.afAuth.authState.subscribe(user => {
          if (user) {
            this.emailLower = user.email?.toLowerCase();
            this.user = this.firestore.collection('users').doc(this.emailLower).valueChanges();
            this.user.subscribe(
              data => {
                this.imgURL = data.photoURL
              })
          }
    this.gymService.getCompletedWorkouts(this.emailLower).pipe(
            tap(donez => {
              this.done = donez;
              this.newArr = donez;
            })
          ).subscribe(() => {
            setTimeout(() => {
              this.aproxTimeAtGym();
            }, 1000);
          });
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
        this.messageService.add("updated profile pic","success")
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
  this.newArr.sort((a:any, b:any) => b.date - a.date) 
}
sortOldestFirst(){
  this.newArr.sort((a:any, b:any) => a.date - b.date)
}
aproxTimeAtGym(){
  let total : number = 0
  this.newArr.forEach((element:any) => {
   total +=  element.aproxTime
  }); 
  const hours = Math.floor(total / 60) 
  const minutes = total % 60
  this.avg = Math.floor(total/this.newArr.length) 
  this.timeSpentHours = hours
  this.timeSpentMinutes = minutes
}
ngOnDestroy(): void {
    this.subscribtions.unsubscribe()
}
uploadFile(event:any) {
  const file = event.target.files[0];
  let safeName = file.name?.replace(/([^a-z0-9.]+)/gi, '');   // file name stripped of spaces and special chars
  let timestamp = Date.now();
  const uniqueSafeName = timestamp + '_' + safeName;
  const filePath = 'uploads/' + uniqueSafeName;                       // Firebase storage path
  const fileRef = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);

  task.snapshotChanges().pipe(
    finalize(() => {
      fileRef.getDownloadURL().subscribe((url:any) => {
        const subscribeImg : any = this.user.subscribe(user => {
          if (user) {
              // Update the photoURL field in Firestore
             this.firestore.doc(`users/${this.emailLower}`).update({
              photoURL: url
            });
            subscribeImg.unsubscribe();
          }
        });
      });
    })
  ).subscribe();
}

}
