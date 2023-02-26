import { Component, OnInit } from '@angular/core';
import { EXERCISES } from '../workouts';
@Component({
  selector: 'app-gymtime',
  templateUrl: './gymtime.component.html',
  styleUrls: ['./gymtime.component.css']
})
export class GymtimeComponent implements OnInit {
 workoutz! : EXERCISES[]
  ngOnInit(): void {
    this.workoutz = JSON.parse(localStorage.getItem('workout') || '{}');
  }
  reset(){
    this.workoutz = JSON.parse(localStorage.getItem('initWorkout') || '{}');
    localStorage.setItem('workout', JSON.stringify(this.workoutz));
  }
  timeLeft: number = 180;
  newTime : number = this.timeLeft;
  interval : any;
  minutes : number = Math.floor(this.timeLeft / 60)
  seconds : any = this.timeLeft % 60
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
        console.log("YEEEAH BUDDY!!!!!!!!!!!")
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

  counterPlus(workout:EXERCISES){
    if(workout.setsDone !== undefined){
      workout.setsDone++
      }
      localStorage.setItem('workout', JSON.stringify(this.workoutz));
      this.resetTimer()
      this.startTimer()
}
setDone(workout:EXERCISES){
  if(workout.done !== undefined){
    workout.done = true
    }
    localStorage.setItem('workout', JSON.stringify(this.workoutz));
}
}
