import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CookingService } from '../cooking-service.service';
import { Location } from '@angular/common';
import { cooking } from '../interfaces';
import { Subscription } from 'rxjs';
import { shopping } from '../interfaces';
@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit{
clickEvent : Subscription;
added : boolean = false
  constructor (private route:ActivatedRoute, private cookingService : CookingService,private location: Location ){
    this.clickEvent = this.cookingService.getClickEvent().subscribe(() => {
      setTimeout(() => {
        this.getMeal()
      }, 50); 
    })
  }
meal : cooking | undefined

ngOnInit(): void {
    this.getMeal()
}
goBack(){
  this.location.back()
  setTimeout(() => {
    this.getMeal()
  }, 50); 
}

getMeal():void{
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.cookingService.getMeal(id).subscribe(meal => this.meal = meal);
}

//shopping list stuff
test(){
  this.added = true
   const object = {
    name: this.meal!.name,
    ingredients: this.meal!.ingredients
  } 
   const shopping : any  = JSON.parse(sessionStorage.getItem('shoppinglist')!);
   let arrOfObj = []
  if (shopping && shopping.length > 1){
  arrOfObj = shopping
  arrOfObj.push(object)
  sessionStorage.setItem('shoppinglist', JSON.stringify(arrOfObj))
  }
 else if(shopping){
  console.log("2")
  arrOfObj.push(shopping)
  arrOfObj.push(object)
  sessionStorage.setItem('shoppinglist', JSON.stringify(arrOfObj)); 
}
else{
  sessionStorage.setItem('shoppinglist', JSON.stringify(object)); 
} 
}

}
