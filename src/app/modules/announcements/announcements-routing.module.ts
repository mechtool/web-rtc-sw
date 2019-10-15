import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AnnouncementsComponent} from "./announcements/announcements.component";


const routes: Routes = [
    {path : '', component : AnnouncementsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementsRoutingModule { }
