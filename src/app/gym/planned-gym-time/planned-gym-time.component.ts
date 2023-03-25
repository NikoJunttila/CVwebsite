import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { singleWorkout } from '../workouts';
import { Location } from '@angular/common';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';
import { sounds } from '../sounds';
import { GymService } from '../gym.service';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MessageService } from 'src/app/services/message.service';
@Component({
  selector: 'app-planned-gym-time',
  templateUrl: './planned-gym-time.component.html',
  styleUrls: ['./planned-gym-time.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class PlannedGymTimeComponent implements OnInit, OnDestroy {

  constructor (private route:ActivatedRoute,private location: Location,private gymService:GymService, private messageService:MessageService,
    private afAuth: AngularFireAuth, private afs: AngularFirestore){
  }
  workoutz : singleWorkout | undefined 
  userLower : string = ""
  showAdd : boolean = false
  showTextArea : boolean = false
  startedTotalTimer : boolean = false

optionalStartTime(){
  const currentDate = new Date();
  sessionStorage.setItem('myDate2', JSON.stringify(currentDate));
  this.startedTotalTimer = true
  console.log("started total time")
  this.messageService.add("train hard 💪","success")
}

testeri(){
  this.showTextArea = !this.showTextArea
}
  onExerciseEdit(index: number) {
    this.workoutz!.exercises[index]!.editing = true;
  }
  onExerciseSave(index: number) {
    this.workoutz!.exercises[index]!.editing = false;
    localStorage.setItem('workout2', JSON.stringify(this.workoutz));
  }

  setAsCompleted(){
    const date : any = new Date();
    if (this.workoutz != undefined){
    this.workoutz.date = date
  }
  const startedTime : any = new Date(JSON.parse(sessionStorage.getItem('myDate2')|| "{}"));
  const diffInMs = Math.abs(startedTime - date)
  const diffInMinutes = Math.floor(diffInMs / 60000)
  console.log(diffInMinutes)
    if(15 <= diffInMinutes && diffInMinutes < 240){
      console.log("time worked")
      this.workoutz!.aproxTime = diffInMinutes + 10
    }
     this.gymService.addCompletedWorkout(this.userLower,this.workoutz)
     this.messageService.add("saved workout","success")
    this.reset()
    this.showTextArea = false
    this.showAdd = false
    this.startedTotalTimer = false
    sessionStorage.removeItem("myDate2")
  }

  loopReps(){
    let total : number = 0
    this.workoutz?.exercises?.forEach((element:any) => {
      total += element.sets - element.setsDone
    })
    if(total < 1){
      this.showAdd = true
    }
  }


  ngOnInit(): void {
    const check = JSON.parse(sessionStorage.getItem('myDate2') || '{}');
    if(Object.keys(check).length !== 0){
      this.startedTotalTimer = true
    }
    this.workoutz = JSON.parse(localStorage.getItem('workout2') || '{}');
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds
    this.playAudio = localStorage.getItem("audio") || 'play'
    this.loopReps()
     this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        let emailLower = user.email?.toLowerCase();
       const  userAdmin = this.afs.collection('users').doc(emailLower).valueChanges()
       userAdmin.subscribe((admin:any) => {
       this.userLower = admin.email_lower
     })
      } 
  })
  }

  goBack(): void {
    this.location.back();
  }
  playAudio : string = ""
 play : string = "play"
 muteVoice : string= "mute"
 timeLeft: number = 180;
 newTime : number = this.timeLeft;
 interval : any;
 minutes : number = Math.floor(this.timeLeft / 60)
 seconds : any = this.timeLeft % 60
  unMute(){
    localStorage.setItem('audio',"play")
    this.playAudio = "play"
  }
  mute(){
    localStorage.setItem('audio',"mute")
    this.playAudio = "mute"
  }
  reset(){
    this.resetTimer()
    this.workoutz = JSON.parse(localStorage.getItem('initWorkout2') || '{}');
    localStorage.setItem('workout2', JSON.stringify(this.workoutz));
    this.showAdd = false
  }
 
  startTimer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.minutes = Math.floor(this.timeLeft / 60)
        this.seconds = this.timeLeft % 60
        this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds
      } else {
        clearInterval(this.interval);
        if(this.playAudio === this.play){
          this.playRandomAudio()
        }
      }
    },1000)
  }

  resetTimer() {
    this.timeLeft = this.newTime
    clearInterval(this.interval);
    this.minutes = Math.floor(this.timeLeft / 60)
    this.seconds = this.timeLeft % 60
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds
  }
  addTime(){
    this.timeLeft = this.timeLeft + 15
    this.minutes = Math.floor(this.timeLeft / 60)
    this.seconds = this.timeLeft % 60
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds
    this.newTime = this.timeLeft
  }
  decreaseTime(){
    this.timeLeft = this.timeLeft - 15
    this.minutes = Math.floor(this.timeLeft / 60)
    this.seconds = this.timeLeft % 60
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds
    this.newTime = this.timeLeft
  }

   counterPlus(workout:any){
    if(!this.startedTotalTimer){
      const currentDate = new Date();
      sessionStorage.setItem('myDate2', JSON.stringify(currentDate));
      this.startedTotalTimer = true
      console.log("started total time")
    }
    if(workout.setsDone !== undefined){
      workout.setsDone++
      localStorage.setItem('workout2', JSON.stringify(this.workoutz));
      this.loopReps()
      if((workout.setsDone === workout.sets)){
      this.resetTimer()
      } else {
        this.resetTimer()
        this.startTimer()
      }
    }
}
setDone(workout:any){
  if(workout.done !== undefined){
    workout.done = true
    }
    localStorage.setItem('workout2', JSON.stringify(this.workoutz));
} 
audioClips: string[] = sounds;
playRandomAudio() {
  const randomIndex = Math.floor(Math.random() * this.audioClips.length);
  const audio = new Audio();
  audio.src = this.audioClips[randomIndex];
  audio.play();
}
ngOnDestroy(): void {
    this.resetTimer()
}
}
