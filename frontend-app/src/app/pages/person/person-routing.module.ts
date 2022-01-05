import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonFormComponent } from './person-form/person-form.component';
import { PersonListComponent } from './person-list/person-list.component';


const routes: Routes = [
  { path: 'person-list', component: PersonListComponent },
  { path: 'person-form', component: PersonFormComponent },
  { path: 'person-form/:id', component: PersonFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRoutingModule { }
