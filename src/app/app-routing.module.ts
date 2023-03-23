import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner/owner.component';
import { PetComponent } from './pet/pet.component';

const routes: Routes = [
  { path: 'owner', component: OwnerComponent},
  { path: 'pet', component: PetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
