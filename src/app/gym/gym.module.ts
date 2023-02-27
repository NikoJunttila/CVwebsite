import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GymRoutingModule } from './gym-routing.module';
import { GymComponent } from './gym.component';
import { GymheaderComponent } from './gymheader/gymheader.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { MakerComponent } from './maker/maker.component';
import { FormsModule } from '@angular/forms';
import { GymtimeComponent } from './gymtime/gymtime.component';
import { CustomFilterPipe } from './custom-filter-pipe.pipe';

@NgModule({
  declarations: [
    GymComponent,
    GymheaderComponent,
    WorkoutsComponent,
    MakerComponent,
    GymtimeComponent,
    CustomFilterPipe
  ],
  imports: [
    CommonModule,
    GymRoutingModule,
    FormsModule,
    ]
})
export class GymModule { }
