import { Component, OnInit } from '@angular/core';
import { shopping } from '../interfaces';
@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {

  shoppingList : any

  ngOnInit(): void {
    const toFilter : any = JSON.parse(sessionStorage.getItem('shoppinglist')!);
    if(toFilter && toFilter.length > 1){
      let filteredRecipes : any = toFilter.filter((recipe : any, index : any, arr: any) => {
        return arr.findIndex((r : any) => r.name === recipe.name) === index
      })
     this.shoppingList = filteredRecipes
    } else {
    this.shoppingList = JSON.parse(sessionStorage.getItem('shoppinglist')!);
  }
  }

  clear(){
    sessionStorage.clear()
    this.shoppingList = null
  }

}
