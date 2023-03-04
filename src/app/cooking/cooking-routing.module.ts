import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CookingComponent } from './cooking.component';
import { ListComponent } from './list/list.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { SingleComponent } from './single/single.component';

const routes: Routes = [
  { path: '', component: CookingComponent ,
  children: [
    {path:"shopping",component: ShoppinglistComponent},
    {path: ":id", component: SingleComponent},
    {path:"",component:ListComponent},
  
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CookingRoutingModule { }
