import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngComponent } from './eng.component';

const routes: Routes = [{ path: '', component: EngComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngRoutingModule { }
