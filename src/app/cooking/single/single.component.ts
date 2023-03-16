import { Component, OnInit,HostListener, OnDestroy} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CookingService } from '../cooking-service.service';
import { Location } from '@angular/common';
import { cooking } from '../interfaces';
import { Subscription } from 'rxjs';
import { shopping } from '../interfaces';
import { FormControl } from '@angular/forms';



@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit,OnDestroy
{
  private subscription!: Subscription;

  added : boolean = false

  constructor (private route:ActivatedRoute, private cookingService : CookingService,private location: Location){}

meal : any | undefined
initmeal : any
kerroin : number | undefined

minus(){
  if(this.kerroin == 0){
    return
  }
  this.kerroin!--
  this.calculate()
}
plus(){
  this.kerroin!++
  this.calculate()
}

ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.subscription = this.cookingService.getDataFromFirestore('recipes', `${id}`)
  .subscribe(data => {
    this.meal = data;
    this.initmeal = JSON.parse(JSON.stringify(this.meal))  
    this.kerroin = this.meal?.portions 
  })
}

calculate(){
  this.meal?.ingredients.forEach((element:any,index:any) => {
    this.meal!.ingredients[index]!.amount =  this.initmeal!.ingredients[index]!.amount * (this.kerroin! / this.initmeal.portions)
  });
}


goBack(){
  this.location.back()
  setTimeout(() => {
  }, 50); 
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
ngOnDestroy(): void {
  if (this.subscription){
    this.subscription.unsubscribe()
    console.log("unsubbed!")
  }
}
}
