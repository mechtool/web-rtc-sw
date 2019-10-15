import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PasswordComponent} from "./password/password.component";


const routes: Routes = [
    {path : '', component : PasswordComponent, data : {type : 'password'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule { }
