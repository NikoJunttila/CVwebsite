import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullworkoutUseraddedComponent } from './fullworkout-useradded/fullworkout-useradded.component';
import { FullworkoutComponent } from './fullworkout/fullworkout.component';
import { GymComponent } from './gym.component';
import { GymtimeComponent } from './gymtime/gymtime.component';
import { InfoComponent } from './info/info.component';
import { MakerComponent } from './maker/maker.component';
import { PlannedGymTimeComponent } from './planned-gym-time/planned-gym-time.component';

const routes: Routes = [
  { path: '',  component: GymComponent },
  {path:"new", component: MakerComponent},
  {path:"lightweight",component: GymtimeComponent},
  {path:"desc/:id", component: FullworkoutComponent},
  {path:"desc/:id/:id",component: PlannedGymTimeComponent},
  {path:"info/:name",component: InfoComponent},
  {path:"personal/:id",component:FullworkoutUseraddedComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymRoutingModule { }
