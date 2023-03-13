import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { BackendComponent } from './backend.component';
import { AdminGuard } from './admin.guard';
const routes: Routes = [{ path: '', component: BackendComponent },
{path:"recipe",component:AddRecipeComponent, canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule { }
