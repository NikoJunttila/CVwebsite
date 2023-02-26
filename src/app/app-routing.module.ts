import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path: "", component: MainComponent},
  { path: 'gym', loadChildren: () => import('./gym/gym.module').then(m => m.GymModule) },
  { path: 'cooking', loadChildren: () => import('./cooking/cooking.module').then(m => m.CookingModule) },
  { path: 'fi', loadChildren: () => import('./main/suomi/suomi.module').then(m => m.SuomiModule) },
  {path: '**', component: NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
