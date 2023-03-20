import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { CookingService } from 'src/app/cooking/cooking-service.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  constructor(private fb: FormBuilder, private send:CookingService, private afs:AngularFirestore, private storage:AngularFireStorage){}
  mealObject = this.fb.group({
    name: [""],
    img: [""],
    time: [""],
    rating: [4],
    id: [],
    portions:[4],
    tags:this.fb.array([""]),
    howTo: this.fb.array(["first"]),
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
     const randomNum : any = Math.floor(Math.random() * (99999 - 11111) + 11111 )
    this.mealObject.value.id = randomNum
    this.send.addRecipe(this.mealObject.value)
    this.mealObject.reset() 
  }
  clearThis(){
    this.mealObject.reset()
  }
  imageUrl: string =""

  uploadFile(event:any) {
    const file = event.target.files[0];
    let safeName = file.name?.replace(/([^a-z0-9.]+)/gi, '');   // file name stripped of spaces and special chars
    let timestamp = Date.now();
    const uniqueSafeName = timestamp + '_' + safeName;
    const filePath = 'uploads/' + uniqueSafeName;                       // Firebase storage path
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.imageUrl = url;
          this.mealObject.patchValue({
            img:url
          })
          console.log(url)
        });
      })
    ).subscribe();
  }
}
