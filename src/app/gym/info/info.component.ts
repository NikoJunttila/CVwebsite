import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { guide } from '../workouts';
import { Location } from '@angular/common';
import { GymService } from '../gym.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  constructor (private route:ActivatedRoute,private location: Location, private gymService:GymService,
    private sanitizer: DomSanitizer){}

  exercise : guide | undefined
  safeSrc: SafeResourceUrl | undefined

  ngOnInit(): void {
      this.getExercise()
      this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.exercise?.link);
  }
  goBack(): void {
    this.location.back();
  }
  getExercise():void{
    const name = String(this.route.snapshot.paramMap.get('name'));
    this.gymService.getExercise(name).subscribe(h => this.exercise = h);
  }
}
