import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-eng',
  templateUrl: './eng.component.html',
  styleUrls: ['./eng.component.css']
})
export class EngComponent {

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
