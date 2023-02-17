import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GymRoutingModule } from './gym-routing.module';
import { GymComponent } from './gym.component';


@NgModule({
  declarations: [
    GymComponent
  ],
  imports: [
    CommonModule,
    GymRoutingModule
  ]
})
export class GymModule { }
