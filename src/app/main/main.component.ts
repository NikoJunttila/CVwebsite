import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent{

    
  prevScrollPos = window.scrollY
  @HostListener("wheel", ["$event"])
  onMouseWheel(event: WheelEvent) {
    let nav = document.getElementById("navbar") as HTMLDivElement | null
    let currentScrollPos = window.scrollY
    if(this.prevScrollPos > currentScrollPos){
    nav!.style.top = "0" 
    }
    else{
       nav!.style.top = "-60px" 
    }
    this.prevScrollPos = currentScrollPos;
    }

}