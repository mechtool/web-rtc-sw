import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PasswordComponent} from "./authorization/password/password.component";
import {PhoneNumberComponent} from "./authorization/phone-number/phone-number.component";
import {StartAuthorizationComponent} from "./authorization/start-authorization/start-authorization.component";
import {SmsCodeComponent} from "./authorization/sms-code/sms-code.component";

const routes: Routes = [
    {path : '', data : {type : 'authorization-page'}, children : [
	    {path : 'mail-password', component : PasswordComponent, data : {type : 'password'}},
	    {path : 'phone-number', component : PhoneNumberComponent, data : {type : 'phone-number'}},
	    {path : 'start-authorization', component : StartAuthorizationComponent, data : {type : 'start-authorization'}},
	    {path : 'sms-code', component : SmsCodeComponent, data : {type : 'sms-code'}},
	    {path : "", pathMatch : 'full', redirectTo: 'start-authorization'},
	]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
