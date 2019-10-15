import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhoneNumberRoutingModule } from './phone-number-routing.module';
import {PhoneNumberComponent} from "./phone-number/phone-number.component";
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppContextService} from "../../../services/app-context.service";


@NgModule({
  declarations: [
      PhoneNumberComponent
  ],
    providers : [
    
    ],
  imports: [
    CommonModule,
    PhoneNumberRoutingModule ,
      MaterialModule,
      ReactiveFormsModule,
      FormsModule,
  ]
})
export class PhoneNumberModule { }
