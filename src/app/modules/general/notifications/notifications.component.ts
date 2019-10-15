import { Component} from '@angular/core';
import {AppContextService} from "../../../services/app-context.service";
import {NotificationContext} from "../../../Classes/MainClasses";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent
{

 public notifications : NotificationContext[] = [];
  constructor(
      public appContext : AppContextService) {
      this.appContext.notificationComp = this;
  }

}
