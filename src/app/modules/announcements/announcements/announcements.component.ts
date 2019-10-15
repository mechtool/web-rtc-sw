import { Component, OnInit } from '@angular/core';
import {AppContextService} from "../../../services/app-context.service";
import {ApplicationComponent} from "../../application/application/application.component";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {

    public appHeight;
    constructor(
      public applicationComponent : ApplicationComponent,
      public appContext : AppContextService
  ) {
       this.appHeight = this.applicationComponent.outletContainer.nativeElement.getBoundingClientRect().height;
  }

  ngOnInit() {
      this.appContext.announcements.next(this.appContext.announcements.value.map(ann => {
          ann.active = false;
          return ann;
      }));
  }

}
