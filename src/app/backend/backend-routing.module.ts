import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { BackendComponent } from './backend.component';
import { AdminGuard } from './admin.guard';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
const routes: Routes = [{ path: '', component: BackendComponent },
{path:"recipe",component:AddRecipeComponent, canActivate:[AdminGuard]},
{path:"workout",component:AddWorkoutComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule { }
