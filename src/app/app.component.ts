import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cv';
  
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
