import { Component, OnInit } from '@angular/core';
import { quote } from '../workouts';
import { quotes } from './quotes';
import { AngularFirestore,AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-gymheader',
  templateUrl: './gymheader.component.html',
  styleUrls: ['./gymheader.component.css']
})
export class GymheaderComponent implements OnInit {
quote : quote | undefined
constructor(private afs:AngularFirestore){}

ngOnInit(): void {
    this.random()
}
random(){
const randomIndex = Math.floor(Math.random() * quotes.length);
this.quote = quotes[randomIndex];
}
async addFeedback(){
  let inputElement = document.getElementById("feedback") as any;
  let inputValue = inputElement.value;    
  const feedBackObject = {
  date: new Date(),
  feedback: inputValue
  }
  const res = await this.afs.collection('feedback').add({
    date: new Date(),
    feedback: inputValue
  }).then(() => {
    inputElement.value = ""
    alert(`thx for feedback <3`)
  }).catch(error => {
    console.log(error)
    alert(error)
  })
}}
