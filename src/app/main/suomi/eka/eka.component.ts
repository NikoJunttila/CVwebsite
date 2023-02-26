import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eka',
  templateUrl: './eka.component.html',
  styleUrls: ['./eka.component.css']
})
export class EkaComponent implements OnInit {
  text : string = "Ohjelmistokehittäjä"
  letters : string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  interval : any = null
  value : string = "Ohjelmistokehittäjä"
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
