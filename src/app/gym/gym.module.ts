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
import { FullworkoutComponent } from './fullworkout/fullworkout.component';
import { PlannedGymTimeComponent } from './planned-gym-time/planned-gym-time.component';
import { InfoComponent } from './info/info.component';
import { FullworkoutUseraddedComponent } from './fullworkout-useradded/fullworkout-useradded.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    GymComponent,
    GymheaderComponent,
    WorkoutsComponent,
    MakerComponent,
    GymtimeComponent,
    CustomFilterPipe,
    FullworkoutComponent,
    PlannedGymTimeComponent,
    InfoComponent,
    FullworkoutUseraddedComponent,
  ],
  imports: [
    CommonModule,
    GymRoutingModule,
    FormsModule,
    DragDropModule
    ]
})
export class GymModule { }
