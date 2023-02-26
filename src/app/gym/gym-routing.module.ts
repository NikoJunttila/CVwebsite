import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymComponent } from './gym.component';
import { GymtimeComponent } from './gymtime/gymtime.component';
import { MakerComponent } from './maker/maker.component';

const routes: Routes = [
  { path: '',  component: GymComponent },
  {path:"new", component: MakerComponent},
  {path:"lightweight",component: GymtimeComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymRoutingModule { }
