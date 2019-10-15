import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserDataComponent} from "./user-data/user-data.component";


const routes: Routes = [
    {path : '', component : UserDataComponent} ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDataRoutingModule { }
