import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookingRoutingModule } from './cooking-routing.module';
import { CookingComponent } from './cooking.component';
import { ListComponent } from './list/list.component';
import { SingleComponent } from './single/single.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';

@NgModule({
  declarations: [
    CookingComponent,
    ListComponent,
    SingleComponent,
    ShoppinglistComponent,
  ],
  imports: [
    CommonModule,
    CookingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  
  ]
})
export class CookingModule { }
