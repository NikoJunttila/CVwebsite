import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rlyDunno } from '../workouts';
import { Location } from '@angular/common';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-planned-gym-time',
  templateUrl: './planned-gym-time.component.html',
  styleUrls: ['./planned-gym-time.component.css'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class PlannedGymTimeComponent implements OnInit {
  constructor (private route:ActivatedRoute,private location: Location){}
  workoutz : rlyDunno | undefined 


  ngOnInit(): void {
     this.workoutz = JSON.parse(sessionStorage.getItem('workout') || '{}');
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds
    this.playAudio = localStorage.getItem("audio") || 'play'
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
    this.workoutz = JSON.parse(sessionStorage.getItem('initWorkout') || '{}');
    sessionStorage.setItem('workout', JSON.stringify(this.workoutz));
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
    this.timeLeft = this.timeLeft + 30
    this.minutes = Math.floor(this.timeLeft / 60)
    this.seconds = this.timeLeft % 60
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds
    this.newTime = this.timeLeft
  }
  decreaseTime(){
    this.timeLeft = this.timeLeft - 30
    this.minutes = Math.floor(this.timeLeft / 60)
    this.seconds = this.timeLeft % 60
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds
    this.newTime = this.timeLeft
  }

   counterPlus(workout:any){
    if(workout.setsDone !== undefined){
      workout.setsDone++
      }
      sessionStorage.setItem('workout', JSON.stringify(this.workoutz));
      this.resetTimer()
      this.startTimer()
}
setDone(workout:any){
  if(workout.done !== undefined){
    workout.done = true
    }
    sessionStorage.setItem('workout', JSON.stringify(this.workoutz));
} 
audioClips: string[] = [
  'assets/buddy.mp3',
  'assets/lightweight.mp3',
];
playRandomAudio() {
  const randomIndex = Math.floor(Math.random() * this.audioClips.length);
  const audio = new Audio();
  audio.src = this.audioClips[randomIndex];
  audio.play();
}
}
