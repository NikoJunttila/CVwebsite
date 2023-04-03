import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { cooking } from '../interfaces';
import { meals } from '../meals';
import { CookingService } from '../cooking-service.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(private cookingService : CookingService){
       this.cookingService.getClickEvent2().subscribe(() => {
      setTimeout(() => {
        this.filter = this.cookingService.getFilters()
        this.filterz()
      }, 50); 
    }) 
  }
 
  list : any[] | undefined
  filter : any = []
  arrOfany : any
  show : boolean = true
  ngOnInit(): void {
     this.getList() 
     this.arrOfany = this.list
     this.getFilter()
     
 }
 sortHigLow(){
  this.arrOfany.sort((a:any,b:any) => b.rating - a.rating)
  this.show = false
 }
 sortLowHigh(){
  this.arrOfany.sort((a:any,b:any) => a.rating - b.rating)
  this.show = true
 }

 filterz(){
  if(this.list){
    this.arrOfany = []
    this.list.forEach(element => {
      const containsAllItems: any[] = this.filter.every((item : any) => element.tags.includes(item))
   if(containsAllItems){
    this.arrOfany.push(element)
   }
    });
}}

  getList():void{
    this.cookingService.getRecipes().subscribe(a => this.list = a)
  }
 async getFilter():Promise<void>{
    this.filter = await this.cookingService.getFilters()
     if(this.filter.length > 0){
      setTimeout(() => {
        this.filterz()
      }, 300);
    } 
  }

}
