import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PhoneNumberComponent} from "./phone-number/phone-number.component";


const routes: Routes = [
    {path : '', component : PhoneNumberComponent, data : {type : 'phone-number'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhoneNumberRoutingModule { }
