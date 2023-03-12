import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  text : string = "Fullstack web dev"
  letters : string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  interval : any = null
  value : string = "Fullstack web dev"
  random = Math.floor(Math.random()* 26)
  
  ngOnInit(): void {
    this.change()
  }
  
  change(){
    let iteration = 0;
    
    clearInterval(this.interval);
    
    this.interval = setInterval(() => {
      this.text = this.text
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return this.value[index];
          }
          return this.letters[Math.floor(Math.random() * 26)]
        })
        .join("");
      if(iteration >= this.value.length){ 
        clearInterval(this.interval);
      }
      iteration += 1 / 3;
    }, 40);
  }
}
