import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path : '', data : {type : 'authorization-page'}, children : [
	    {path : 'mail-password', loadChildren : ()=> import('../authorization/password/password.module').then(m => m.PasswordModule)},
	    {path : 'phone-number', loadChildren : ()=> import('../authorization/phone-number/phone-number.module').then(m => m.PhoneNumberModule)},
	    {path : 'start-authorization', loadChildren : ()=> import('../authorization/start-authorization/start-authorization.module').then(m => m.StartAuthorizationModule)},
	    {path : 'sms-code', loadChildren : ()=> import('../authorization/sms-code/sms-code.module').then(m => m.SmsCodeModule)},
	    {path : "", pathMatch : 'full', redirectTo: 'start-authorization'},
	]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
