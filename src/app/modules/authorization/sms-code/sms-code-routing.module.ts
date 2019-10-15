import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SmsCodeComponent} from "./sms-code/sms-code.component";


const routes: Routes = [
    {path : '', component : SmsCodeComponent, data : {type : 'sms-code'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsCodeRoutingModule { }
