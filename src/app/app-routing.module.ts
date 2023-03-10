import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './services/auth.guard';
import { LostpassComponent } from './lostpass/lostpass.component';

const routes: Routes = [
  {path: "", component: MainComponent},
  { path: 'gym', loadChildren: () => import('./gym/gym.module').then(m => m.GymModule) },
  { path: 'cooking', loadChildren: () => import('./cooking/cooking.module').then(m => m.CookingModule) },
  { path: 'fi', loadChildren: () => import('./main/suomi/suomi.module').then(m => m.SuomiModule) },
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"dashboard",component:DashboardComponent, canActivate:[AuthGuard]},
  {path:"lostpass",component:LostpassComponent},
  {path: '**', component: NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
