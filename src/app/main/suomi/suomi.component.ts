import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-suomi',
  templateUrl: './suomi.component.html',
  styleUrls: ['./suomi.component.css']
})
export class SuomiComponent {
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
