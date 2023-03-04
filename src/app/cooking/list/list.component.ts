import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { meals } from '../meals';
import { cooking } from '../interfaces';
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
        this.filter = cookingService.myData
        this.test()
      }, 50); 
    })
  }

  list : cooking[] | undefined

  ngOnInit(): void {
    this.getList()
    this.getFilter()
    this.arrOfany = this.list
}
filter : any
arrOfany : any
 test(){
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
    this.cookingService.getMeals().subscribe(a => this.list = a)
  }
  getFilter():void{
    this.filter = this.cookingService.myData
  }

}
