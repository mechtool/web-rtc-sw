import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.css']
})
export class AuthorizationPageComponent implements OnInit {
    
    public recaptchaVerifier;
    public confirmation : any;

    constructor() { }

  ngOnInit() {
  }


}
