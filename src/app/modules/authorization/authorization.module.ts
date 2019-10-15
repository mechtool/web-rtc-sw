import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import {AuthFirebaseService} from "../../services/auth-firebase.service";
import {AuthorizationPageComponent} from "./authorization/authorization-page/authorization-page.component";
import {PasswordComponent} from "./authorization/password/password.component";
import {PhoneNumberComponent} from "./authorization/phone-number/phone-number.component";
import {SmsCodeComponent} from "./authorization/sms-code/sms-code.component";
import {StartAuthorizationComponent} from "./authorization/start-authorization/start-authorization.component";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
      AuthorizationPageComponent,
      PasswordComponent,
      PhoneNumberComponent,
      SmsCodeComponent,
      StartAuthorizationComponent
  ],
    providers : [
        AuthFirebaseService
    ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule ,
      MaterialModule,
      ReactiveFormsModule,
  ]
})
export class AuthorizationModule { }
