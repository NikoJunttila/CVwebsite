import { Component, OnInit, HostListener, Input } from '@angular/core';
import { CookingService } from './cooking-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cooking',
  templateUrl: './cooking.component.html',
  styleUrls: ['./cooking.component.css']
})
export class CookingComponent implements OnInit {
constructor(private cooking: CookingService, private router: Router,private fb: FormBuilder){
  this.form = fb.group({
    selectedCountries:  new FormArray([])
   });
}

random(){
  /* const index = Math.floor(Math.random() *this.length + 1)
  this.router.navigate([`cooking/${index}`]);  */
  this.cooking.sendClickEvent()
}

ngOnInit(): void {
}


filters(){
var button = document.getElementById("filter-button") as HTMLElement;
var container = document.getElementById("filter-container") as HTMLDivElement;

  if (container.classList.contains("filters--active")) {
    container.classList.remove("filters--active");
    button.classList.remove("button--highlight")
  } else {
     container.classList.add("filters--active");
     button.classList.add("button--highlight")
   }
}
@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  var button = document.getElementById("filter-button") as HTMLElement;
  var container = document.getElementById("filter-container") as HTMLDivElement;
  container.onclick = function (e) {
    e.stopPropagation();
  }
  if (!(event.target == document.getElementById("filter-button"))) {
    container.classList.remove("filters--active")
    button.classList.remove("button--highlight")
  } 
}
  form: FormGroup;
  countries: Array<any> = [
    { name: 'mealprep', value: 'mealprep' },
    { name: 'lunch', value: 'lunch' },
    { name: 'breakfast', value: 'breakfast' },
    { name: 'easy', value: 'easy' },
    { name: 'healthy', value: 'healthy' },
    { name: 'chicken', value: 'chicken' },
    { name: 'beef', value: 'beef' },
    { name: 'dessert', value: 'dessert' },
  ];
selected : any = []
  onCheckboxChange(event: any) {
    
    const selectedCountries = (this.form.controls['selectedCountries'] as FormArray);
    if (event.target.checked) {
      selectedCountries.push(new FormControl(event.target.value));
      this.selected = selectedCountries
    } else {
      const index = selectedCountries.controls
      .findIndex(x => x.value === event.target.value);
      selectedCountries.removeAt(index);
      this.selected = selectedCountries
    }
    this.cooking.myData = selectedCountries.value
 }
  public btnClick():void {
    this.cooking.sendClickEvent2()
  }
  onActivate() {
    // window.scroll(0,0);
 
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 
     //or document.body.scrollTop = 0;
     //or document.querySelector('body').scrollTo(0,0)

 }


}


