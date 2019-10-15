import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementsRoutingModule } from './announcements-routing.module';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementComponent } from './announcement/announcement.component';


@NgModule({
  declarations: [
      AnnouncementsComponent,
      AnnouncementComponent
  ],
  imports: [
    CommonModule,
    AnnouncementsRoutingModule
  ]
})
export class AnnouncementsModule { }
