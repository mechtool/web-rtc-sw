import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartAuthorizationComponent} from "./start-authorization/start-authorization.component";


const routes: Routes = [
    {path : '', component : StartAuthorizationComponent, data : {type : 'start-authorization'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartAuthorizationRoutingModule { }
