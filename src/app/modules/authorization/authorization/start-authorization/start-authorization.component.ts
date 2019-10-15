import { Component, OnInit } from '@angular/core';
import {AppContextService} from "../../../../services/app-context.service";

@Component({
  selector: 'app-start-authorization',
  templateUrl: './start-authorization.component.html',
  styleUrls: ['./start-authorization.component.css']
})
export class StartAuthorizationComponent implements OnInit {
    
    public user;
    public images = [
	{src : '/assets/social/mail.svg', tip : 'Mail', link : '/authorization/mail-password'},
	{src : '/assets/social/phone.svg', tip : 'Phone', link: '/authorization/phone-number'},
    ];
    constructor(public appContext : AppContextService) {
        this.appContext.user.subscribe(user => {
              this.user = user;
              this.appContext.appChangeRef.markForCheck();
	})
    }

  ngOnInit() {
  }

}
