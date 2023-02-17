import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookingRoutingModule } from './cooking-routing.module';
import { CookingComponent } from './cooking.component';


@NgModule({
  declarations: [
    CookingComponent
  ],
  imports: [
    CommonModule,
    CookingRoutingModule
  ]
})
export class CookingModule { }
