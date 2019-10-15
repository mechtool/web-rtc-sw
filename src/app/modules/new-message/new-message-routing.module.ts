import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewMessageComponent} from "./new-message.component";
const routes: Routes = [
    {path : '', component: NewMessageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewMessageRoutingModule { }
