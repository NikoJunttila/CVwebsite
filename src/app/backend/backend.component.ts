import { Component } from '@angular/core';
import { cooking } from '../cooking/interfaces';
import { FormGroup, FormControl, FormBuilder, FormArray,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.css']
})
export class BackendComponent {
constructor(private fb: FormBuilder, private send:AuthService){}
mealObject = this.fb.group({
  name: ["",[Validators.required]],
  img: ["",[Validators.required]],
  time: ["",[Validators.required]],
  rating: [4,[Validators.required]],
  id: [],
  portions:[4],
  tags:this.fb.array(["healthy"]),
  howTo: this.fb.array(["first"],[Validators.required]),
  ingredients: this.fb.array([this.fb.group({amount:[],what:[""],name:[""]})]) 
})
ingredients = this.mealObject.get('ingredients') as FormArray;
tags = this.mealObject.get('tags') as FormArray;
howTo = this.mealObject.get('howTo') as FormArray;

addTag() {
  this.tags.push(new FormControl(''));
} 
 removeTag(index: number) {
  this.tags.removeAt(index);
}
 addHowto() {
 this.howTo.push(new FormControl(''));
}  
clearForm(){
  console.log(this.mealObject.value.id)
console.log(this.mealObject)
this.mealObject.reset()
}

 removeHowTo(index: number) {
  this.howTo.removeAt(index);
}
addingredient() {
const group = new FormGroup({
  amount: new FormControl(""),
  what: new FormControl(''),
  name: new FormControl(''),
});
this.ingredients.push(group)
}
removeIngredient(index: number){
  this.ingredients.removeAt(index)
}

onSubmit(){
  /* this.send.addRecipe(this.mealObject.value) */
  const randomNum : any = Math.floor(Math.random() * (99999 - 11111) + 11111 )
  this.mealObject.value.id = randomNum
  console.log(this.mealObject.value.id)
  console.log(this.mealObject)
  this.mealObject.reset()
}
clearThis(){
  const randomNum : any = Math.floor(Math.random() * (99999 - 11111) + 11111 )
  this.mealObject.value.id = randomNum
  console.log(this.mealObject.value.id)
  console.log(this.mealObject)
  this.mealObject.reset()
}
}
