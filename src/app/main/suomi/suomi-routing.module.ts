import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuomiComponent } from './suomi.component';

const routes: Routes = [{ path: '', component: SuomiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuomiRoutingModule { }
