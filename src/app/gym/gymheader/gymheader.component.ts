import { Component, OnInit } from '@angular/core';
import { quote } from '../workouts';
import { quotes } from './quotes';
@Component({
  selector: 'app-gymheader',
  templateUrl: './gymheader.component.html',
  styleUrls: ['./gymheader.component.css']
})
export class GymheaderComponent implements OnInit {
quote : quote | undefined

ngOnInit(): void {
    this.random()
}

random(){
const randomIndex = Math.floor(Math.random() * quotes.length);
this.quote = quotes[randomIndex];
}
}
