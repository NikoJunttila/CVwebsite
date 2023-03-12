import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  constructor(private fb: FormBuilder, private send:AuthService){}
  mealObject = this.fb.group({
    name: [""],
    img: [""],
    time: [""],
    rating: [4],
    id: [Math.floor(Math.random() * (99999 - 11111) + 11111 )],
    portions:[4],
    tags:this.fb.array(["healthy"]),
    howTo: this.fb.array([]),
    ingredients: this.fb.array([this.fb.group({amount:[0],what:[""],name:[""]})]) 
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
    console.log("added new recipe")
    this.mealObject.reset()
  }
  
  
}
